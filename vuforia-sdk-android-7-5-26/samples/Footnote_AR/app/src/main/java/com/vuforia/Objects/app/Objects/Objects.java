/*===============================================================================
Copyright (c) 2016-2018 PTC Inc. All Rights Reserved.

Copyright (c) 2012-2014 Qualcomm Connected Experiences, Inc. All Rights Reserved.

Vuforia is a trademark of PTC Inc., registered in the United States and other 
countries.
===============================================================================*/

package com.vuforia.Objects.app.Objects;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.GestureDetector;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.OrientationEventListener;
import android.view.View;
import android.view.View.MeasureSpec;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.TranslateAnimation;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import com.vuforia.CameraDevice;
import com.vuforia.ObjectTracker;
import com.footnote.htlleonding.R;
import com.vuforia.SampleApplication.SampleApplicationControl;
import com.vuforia.SampleApplication.SampleApplicationException;
import com.vuforia.SampleApplication.SampleApplicationSession;
import com.vuforia.SampleApplication.utils.LoadingDialogHandler;
import com.vuforia.SampleApplication.utils.SampleApplicationGLView;
import com.vuforia.SampleApplication.utils.Texture;
import com.vuforia.State;
import com.vuforia.TargetFinder;
import com.vuforia.TargetFinderQueryResult;
import com.vuforia.TargetSearchResult;
import com.vuforia.Trackable;
import com.vuforia.Tracker;
import com.vuforia.TrackerManager;
import com.vuforia.Vuforia;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;


// The main activity for the Objects sample.
public class Objects extends Activity implements SampleApplicationControl
{
    private static final String LOGTAG = "Objects";

    SampleApplicationSession vuforiaAppSession;

    // Defines the Server URL to get the objects data
    private static final String mServerURL = "https://vm68.htl-leonding.ac.at/javaendpoint/footnote";
    //private static final String mServerURL = "http://localhost:8080/footnote";

    // Stores the current status of the target ( if is being displayed or not )
    private static final int ObjectINFO_NOT_DISPLAYED = 0;
    private static final int ObjectINFO_IS_DISPLAYED = 1;

    // These codes match the ones defined in TargetFinder in Vuforia.jar
    static final int INIT_SUCCESS = 2;
    static final int INIT_ERROR_NO_NETWORK_CONNECTION = -1;
    static final int INIT_ERROR_SERVICE_NOT_AVAILABLE = -2;
    static final int UPDATE_ERROR_AUTHORIZATION_FAILED = -1;
    static final int UPDATE_ERROR_PROJECT_SUSPENDED = -2;
    static final int UPDATE_ERROR_NO_NETWORK_CONNECTION = -3;
    static final int UPDATE_ERROR_SERVICE_NOT_AVAILABLE = -4;
    static final int UPDATE_ERROR_BAD_FRAME_QUALITY = -5;
    static final int UPDATE_ERROR_UPDATE_SDK = -6;
    static final int UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE = -7;
    static final int UPDATE_ERROR_REQUEST_TIMEOUT = -8;

    // Handles Codes to display/Hide views
    static final int HIDE_STATUS_BAR = 0;
    static final int SHOW_STATUS_BAR = 1;

    static final int HIDE_2D_OVERLAY = 0;
    static final int SHOW_2D_OVERLAY = 1;

    static final int HIDE_LOADING_DIALOG = 0;
    static final int SHOW_LOADING_DIALOG = 1;

    // Augmented content status
    private int mObjectInfoStatus = ObjectINFO_NOT_DISPLAYED;

    // Status Bar Text
    private String mStatusBarText;

    // Active Object Data
    private RealObject mObjectData;
    private String mObjectJSONUrl;
    private Texture mObjectDataTexture;

    private TargetFinder mTargetFinder;

    private static String jwt;

    // Indicates if the app is currently loading the object data
    private boolean mIsLoadingObjectData = false;

    // AsyncTask to get object data from a json object
    private GetObjectDataTask mGetObjectDataTask;

    // Our OpenGL view:
    private SampleApplicationGLView mGlView;

    // Our renderer:
    private ObjectsRenderer mRenderer;

    private static final String kAccessKey = "d44aefbd0f74494945619fb0781a79a51ebd45f8";
    private static final String kSecretKey = "2d4271f4bebfe9977021b883a87c69676c1b88f1";

    // View overlays to be displayed in the Augmented View
    private RelativeLayout mUILayout;
    private TextView mStatusBar;
    private Button mCloseButton;

    // Error message handling:
    private int mlastErrorCode = 0;
    private int mInitErrorCode = 0;
    private boolean mFinishActivityOnError;

    // Alert Dialog used to display SDK errors
    private AlertDialog mErrorDialog;

    // Detects the double tap gesture for launching the Camera menu
    private GestureDetector mGestureDetector;

    private OrientationEventListener mOrientationEventListener;

    private String lastTargetId = "";

    // size of the Texture to be generated with the object data
    private static int mTextureSize = 768;

    // declare scan line and its animation
    private View scanLine;
    private TranslateAnimation scanAnimation;
    private boolean scanLineStarted;

    public void deinitObjects()
    {
        if (mTargetFinder == null)
        {
            Log.e(LOGTAG, "Tried to deinit TargetFinder but was not initialized");
            return;
        }
        mTargetFinder.deinit();
    }


    private void initStateVariables()
    {
        mRenderer.setRenderState(ObjectsRenderer.RS_SCANNING);
        mRenderer.setProductTexture(null);

        mRenderer.setScanningMode(true);
        mRenderer.isShowing2DOverlay(false);
        mRenderer.showAnimation3Dto2D(false);
        mRenderer.stopTransition3Dto2D();
        mRenderer.stopTransition2Dto3D();

        cleanTargetTrackedId();
    }


    /**
     * Function to generate the OpenGL Texture Object in the renderFrame thread
     */
    public void productTextureIsCreated()
    {
        mRenderer.setRenderState(ObjectsRenderer.RS_TEXTURE_GENERATED);
    }


    /** Sets current device Scale factor based on screen dpi */
    public void setDeviceDPIScaleFactor(float dpiSIndicator)
    {
        mRenderer.setDPIScaleIndicator(dpiSIndicator);

        // MDPI devices
        if (dpiSIndicator <= 1.0f)
        {
            mRenderer.setScaleFactor(1.6f);
        }
        // HDPI devices
        else if (dpiSIndicator <= 1.5f)
        {
            mRenderer.setScaleFactor(1.3f);
        }
        // XHDPI devices
        else if (dpiSIndicator <= 2.0f)
        {
            mRenderer.setScaleFactor(1.0f);
        }
        // XXHDPI devices
        else
        {
            mRenderer.setScaleFactor(0.6f);
        }
    }


    /** Cleans the lastTargetTrackerId variable */
    public void cleanTargetTrackedId()
    {
        synchronized (lastTargetId)
        {
            lastTargetId = "";
        }
    }

    /**
     * Crates a Handler to Show/Hide the status bar overlay from an UI Thread
     */
    static class StatusBarHandler extends Handler
    {
        private final WeakReference<Objects> mObjects;


        StatusBarHandler(Objects objects)
        {
            mObjects = new WeakReference<Objects>(objects);
        }


        public void handleMessage(Message msg)
        {
            Objects objects = mObjects.get();
            if (objects == null)
            {
                return;
            }

            if (msg.what == SHOW_STATUS_BAR)
            {
                objects.mStatusBar.setText(objects.mStatusBarText);
                objects.mStatusBar.setVisibility(View.VISIBLE);
            } else
            {
                objects.mStatusBar.setVisibility(View.GONE);
            }
        }
    }

    private Handler statusBarHandler = new StatusBarHandler(this);

    /**
     * Creates a handler to Show/Hide the UI Overlay from an UI thread
     */
    static class Overlay2dHandler extends Handler
    {
        private final WeakReference<Objects> mObjects;


        Overlay2dHandler(Objects objects)
        {
            mObjects = new WeakReference<Objects>(objects);
        }


        public void handleMessage(Message msg)
        {
            Objects objects = mObjects.get();
            if (objects == null)
            {
                return;
            }

            if (objects.mCloseButton != null)
            {
                if (msg.what == SHOW_2D_OVERLAY)
                {
                    objects.mCloseButton.setVisibility(View.VISIBLE);
                } else
                {
                    objects.mCloseButton.setVisibility(View.GONE);
                }
            }
        }
    }

    private Handler overlay2DHandler = new Overlay2dHandler(this);

    private LoadingDialogHandler loadingDialogHandler = new LoadingDialogHandler(
            this);

    private double mLastErrorTime;

    private float mdpiScaleIndicator;

    private Activity mActivity = null;

    public static final String PREFS_NAME = "NativeStorage";


    // Called when the activity first starts or needs to be recreated after
    // resuming the application or a configuration change.
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        Log.d(LOGTAG, "onCreate");
        super.onCreate(savedInstanceState);

        mActivity = this;

        vuforiaAppSession = new SampleApplicationSession(this);

        Intent intent = getIntent();

        jwt = intent.getStringExtra("jwt");
        Log.d("jwt",jwt);

        startLoadingAnimation();

        vuforiaAppSession
                .initAR(this, ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);

        // Creates the GestureDetector listener for processing double tap
        mGestureDetector = new GestureDetector(getApplicationContext(), new GestureListener());

        mdpiScaleIndicator = getApplicationContext().getResources()
                .getDisplayMetrics().density;

        // Use an OrientationChangeListener here to capture all orientation changes.  Android
        // will not send an Activity.onConfigurationChanged() callback on a 180 degree rotation,
        // ie: Left Landscape to Right Landscape.  Vuforia needs to react to this change and the
        // SampleApplicationSession needs to update the Projection Matrix.
        mOrientationEventListener = new OrientationEventListener(mActivity)
        {
            @Override
            public void onOrientationChanged(int i)
            {
                int activityRotation = mActivity.getWindowManager().getDefaultDisplay().getRotation();
                if(mLastRotation != activityRotation)
                {
                    // Update video background for 180 degree rotation
                    if (Math.abs(mLastRotation - activityRotation) == 2
                            && mRenderer != null)
                    {
                        mRenderer.updateVideoBackground();
                    }
                    mLastRotation = activityRotation;
                }
            }

            int mLastRotation = -1;
        };

        if(mOrientationEventListener.canDetectOrientation())
            mOrientationEventListener.enable();
    }

    String getValue(String key, String defaultValue) {
        SharedPreferences settings = getSharedPreferences(PREFS_NAME, Activity.MODE_PRIVATE);
        return settings.getString(key, defaultValue);
    }

    // Called when the activity will start interacting with the user.
    @Override
    protected void onResume()
    {
        Log.d(LOGTAG, "onResume");
        super.onResume();

        showProgressIndicator(true);
        vuforiaAppSession.onResume();

        mObjectInfoStatus = ObjectINFO_NOT_DISPLAYED;

        // By default the 2D Overlay is hidden
        hide2DOverlay();

        // Display scan line when app is resumed
        if (loadingDialogHandler.mLoadingDialogContainer.getVisibility() != View.VISIBLE)
        {
            scanlineStart();
        }
    }


    // Callback for configuration changes the activity handles itself
    @Override
    public void onConfigurationChanged(Configuration config)
    {
        Log.d(LOGTAG, "onConfigurationChanged");
        super.onConfigurationChanged(config);

        vuforiaAppSession.onConfigurationChanged();
        scanCreateAnimation();
    }


    // Called when the system is about to start resuming a previous activity.
    @Override
    protected void onPause()
    {
        Log.d(LOGTAG, "onPause");
        super.onPause();

        vuforiaAppSession.pauseAR();

        // When the camera stops it clears the Product Texture ID so next time
        // textures
        // Are recreated
        if (mRenderer != null)
        {
            mRenderer.deleteCurrentProductTexture();

            // Initialize all state Variables
            initStateVariables();
        }

        // Pauses the OpenGLView
        if (mGlView != null)
        {
            mGlView.setVisibility(View.INVISIBLE);
            mGlView.onPause();
        }
    }


    // The final call you receive before your activity is destroyed.
    @Override
    protected void onDestroy()
    {
        Log.d(LOGTAG, "onDestroy");
        super.onDestroy();

        try
        {
            vuforiaAppSession.stopAR();
        } catch (SampleApplicationException e)
        {
            Log.e(LOGTAG, e.getString());
        }

        mGestureDetector = null;
        mCloseButton.setOnClickListener(null);
        mOrientationEventListener.disable();
        mOrientationEventListener = null;

        System.gc();
        // Starts an Intent to open the object URL
        // Intent viewIntent = new Intent(this, ListViewActivity.class);

        // startActivity(viewIntent);
        // finish();
    }


    private void startLoadingAnimation()
    {
        // Inflates the Overlay Layout to be displayed above the Camera View
        LayoutInflater inflater = LayoutInflater.from(this);
        mUILayout = (RelativeLayout) inflater.inflate(
                R.layout.camera_overlay_objects, null, false);

        mUILayout.setVisibility(View.VISIBLE);
        mUILayout.setBackgroundColor(Color.BLACK);

        // By default
        loadingDialogHandler.mLoadingDialogContainer = mUILayout
                .findViewById(R.id.loading_layout);
        loadingDialogHandler.mLoadingDialogContainer
                .setVisibility(View.VISIBLE);

        addContentView(mUILayout, new LayoutParams(LayoutParams.MATCH_PARENT,
                LayoutParams.MATCH_PARENT));

        // Gets a Reference to the Bottom Status Bar
        mStatusBar = mUILayout.findViewById(R.id.overlay_status);

        // Shows the loading indicator at start
        loadingDialogHandler
                .sendEmptyMessage(LoadingDialogHandler.SHOW_LOADING_DIALOG);

        // Gets a reference to the Close Button
        mCloseButton = mUILayout
                .findViewById(R.id.overlay_close_button);

        // Sets the Close Button functionality
        mCloseButton.setOnClickListener(new OnClickListener()
        {
            public void onClick(View v)
            {
                // Updates application status
                mObjectInfoStatus = ObjectINFO_NOT_DISPLAYED;

                loadingDialogHandler.sendEmptyMessage(HIDE_LOADING_DIALOG);

                // Checks if the app is currently loading a object data
                if (mIsLoadingObjectData)
                {

                    // Cancels the AsyncTask
                    mGetObjectDataTask.cancel(true);
                    mIsLoadingObjectData = false;

                    // Cleans the Target Tracker Id
                    cleanTargetTrackedId();
                }

                // Enters Scanning Mode
                enterScanningMode();
            }
        });

        // As default the 2D overlay and Status bar are hidden when application
        // starts
        hide2DOverlay();
        hideStatusBar();

        scanLine = mUILayout.findViewById(R.id.scan_line);
        scanLine.setVisibility(View.GONE);
        scanLineStarted = false;
        scanCreateAnimation();
    }


    // Initializes AR application components.
    private void initApplicationAR()
    {
        // Create OpenGL ES view:
        int depthSize = 16;
        int stencilSize = 0;
        boolean translucent = Vuforia.requiresAlpha();

        // Initialize the GLView with proper flags
        mGlView = new SampleApplicationGLView(getApplicationContext());
        mGlView.init(translucent, depthSize, stencilSize);

        // Setups the Renderer of the GLView
        mRenderer = new ObjectsRenderer(this, vuforiaAppSession);
        mRenderer.mActivityRef = new WeakReference<>(this);
        mGlView.setRenderer(mRenderer);

        // Sets the device scale density
        setDeviceDPIScaleFactor(mdpiScaleIndicator);

        initStateVariables();
    }


    /** Sets the Status Bar Text in a UI thread */
    public void setStatusBarText(String statusText)
    {
        mStatusBarText = statusText;
        statusBarHandler.sendEmptyMessage(SHOW_STATUS_BAR);
    }


    /** Hides the Status bar 2D Overlay in a UI thread */
    public void hideStatusBar()
    {
        if (mStatusBar.getVisibility() == View.VISIBLE)
        {
            statusBarHandler.sendEmptyMessage(HIDE_STATUS_BAR);
        }
    }


    /** Shows the Status Bar 2D Overlay in a UI thread */
    public void showStatusBar()
    {
        if (mStatusBar.getVisibility() == View.GONE)
        {
            statusBarHandler.sendEmptyMessage(SHOW_STATUS_BAR);
        }
    }


    /** Starts the WebView with the Object Extra Data */
    public void startWebView(int value)
    {
        // Checks that we have a valid object data
        if (mObjectData != null)
        {
            // Starts an Intent to open the object URL
            // Intent viewIntent = new Intent("android.intent.action.VIEW",
            //Uri.parse(mObjectData.getObjectUrl()));

            //startActivity(viewIntent);
        }
    }


    /** Returns the error message for each error code */
    private String getStatusDescString(int code)
    {
        if (code == UPDATE_ERROR_AUTHORIZATION_FAILED)
            return getString(R.string.UPDATE_ERROR_AUTHORIZATION_FAILED_DESC);
        if (code == UPDATE_ERROR_PROJECT_SUSPENDED)
            return getString(R.string.UPDATE_ERROR_PROJECT_SUSPENDED_DESC);
        if (code == UPDATE_ERROR_NO_NETWORK_CONNECTION)
            return getString(R.string.UPDATE_ERROR_NO_NETWORK_CONNECTION_DESC);
        if (code == UPDATE_ERROR_SERVICE_NOT_AVAILABLE)
            return getString(R.string.UPDATE_ERROR_SERVICE_NOT_AVAILABLE_DESC);
        if (code == UPDATE_ERROR_UPDATE_SDK)
            return getString(R.string.UPDATE_ERROR_UPDATE_SDK_DESC);
        if (code == UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE)
            return getString(R.string.UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE_DESC);
        if (code == UPDATE_ERROR_REQUEST_TIMEOUT)
            return getString(R.string.UPDATE_ERROR_REQUEST_TIMEOUT_DESC);
        if (code == UPDATE_ERROR_BAD_FRAME_QUALITY)
            return getString(R.string.UPDATE_ERROR_BAD_FRAME_QUALITY_DESC);
        else
        {
            return getString(R.string.UPDATE_ERROR_UNKNOWN_DESC);
        }
    }


    /** Returns the error message for each error code */
    private String getStatusTitleString(int code)
    {
        if (code == UPDATE_ERROR_AUTHORIZATION_FAILED)
            return getString(R.string.UPDATE_ERROR_AUTHORIZATION_FAILED_TITLE);
        if (code == UPDATE_ERROR_PROJECT_SUSPENDED)
            return getString(R.string.UPDATE_ERROR_PROJECT_SUSPENDED_TITLE);
        if (code == UPDATE_ERROR_NO_NETWORK_CONNECTION)
            return getString(R.string.UPDATE_ERROR_NO_NETWORK_CONNECTION_TITLE);
        if (code == UPDATE_ERROR_SERVICE_NOT_AVAILABLE)
            return getString(R.string.UPDATE_ERROR_SERVICE_NOT_AVAILABLE_TITLE);
        if (code == UPDATE_ERROR_UPDATE_SDK)
            return getString(R.string.UPDATE_ERROR_UPDATE_SDK_TITLE);
        if (code == UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE)
            return getString(R.string.UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE_TITLE);
        if (code == UPDATE_ERROR_REQUEST_TIMEOUT)
            return getString(R.string.UPDATE_ERROR_REQUEST_TIMEOUT_TITLE);
        if (code == UPDATE_ERROR_BAD_FRAME_QUALITY)
            return getString(R.string.UPDATE_ERROR_BAD_FRAME_QUALITY_TITLE);
        else
        {
            return getString(R.string.UPDATE_ERROR_UNKNOWN_TITLE);
        }
    }


    // Shows error messages as System dialogs
    public void showErrorMessage(int errorCode, double errorTime, boolean finishActivityOnError)
    {
        if (errorTime < (mLastErrorTime + 5.0) || errorCode == mlastErrorCode)
            return;

        mlastErrorCode = errorCode;
        mFinishActivityOnError = finishActivityOnError;

        runOnUiThread(new Runnable()
        {
            public void run()
            {
                if (mErrorDialog != null)
                {
                    mErrorDialog.dismiss();
                }

                // Generates an Alert Dialog to show the error message
                AlertDialog.Builder builder = new AlertDialog.Builder(
                        Objects.this);
                builder
                        .setMessage(
                                getStatusDescString(Objects.this.mlastErrorCode))
                        .setTitle(
                                getStatusTitleString(Objects.this.mlastErrorCode))
                        .setCancelable(false)
                        .setIcon(0)
                        .setPositiveButton(getString(R.string.button_OK),
                                new DialogInterface.OnClickListener()
                                {
                                    public void onClick(DialogInterface dialog, int id)
                                    {
                                        if(mFinishActivityOnError)
                                        {
                                            finish();
                                        }
                                        else
                                        {
                                            dialog.dismiss();
                                        }
                                    }
                                });

                mErrorDialog = builder.create();
                mErrorDialog.show();
            }
        });
    }


    /**
     * Generates a texture for the object data fetching the object info from the
     * specified object URL
     */
    public void createProductTexture(String objectJSONUrl)
    {
        // gets object url from parameters
        mObjectJSONUrl = objectJSONUrl.trim();

        // Cleans old texture reference if necessary
        if (mObjectDataTexture != null)
        {
            mObjectDataTexture = null;

            System.gc();
        }

        // Searches for the object data in an AsyncTask
        mGetObjectDataTask = new GetObjectDataTask(this);
        mGetObjectDataTask.execute();
    }

    /** Gets the object data from a JSON Object */
    private static class GetObjectDataTask extends AsyncTask<Void, Void, Void>
    {
        private String mObjectDataJSONFullUrl;
        private static final String CHARSET = "UTF-8";

        WeakReference<Objects> activityRef;

        public GetObjectDataTask(Objects activity)
        {
            activityRef = new WeakReference<>(activity);
        }

        protected void onPreExecute()
        {
            activityRef.get().mIsLoadingObjectData = true;

            // Initialize the current object full url to search
            // for the data
            StringBuilder sBuilder = new StringBuilder();
            sBuilder.append(mServerURL+"/rest/realObject/");
            sBuilder.append(activityRef.get().mObjectJSONUrl);

            mObjectDataJSONFullUrl = sBuilder.toString();

            // Shows the loading dialog
            activityRef.get().loadingDialogHandler.sendEmptyMessage(SHOW_LOADING_DIALOG);
        }


        protected Void doInBackground(Void... params)
        {
            HttpURLConnection connection = null;

            try
            {
                // Connects to the Server to get the object data
                URL url = new URL(mObjectDataJSONFullUrl);
                connection = (HttpURLConnection) url.openConnection();

                connection.setRequestProperty("Accept-Charset", CHARSET);
                connection.setRequestProperty("Authorization", "Bearer " + jwt);
                connection.connect();

                int status = connection.getResponseCode();

                // Checks that the object JSON url exists and connection
                // has been successful
                if (status != HttpURLConnection.HTTP_OK)
                {
                    // Cleans object data variables
                    activityRef.get().mObjectData = null;
                    activityRef.get().mObjectInfoStatus = ObjectINFO_NOT_DISPLAYED;

                    // Hides loading dialog
                    activityRef.get().loadingDialogHandler.sendEmptyMessage(HIDE_LOADING_DIALOG);

                    // Cleans current tracker Id and returns to scanning mode
                    activityRef.get().cleanTargetTrackedId();

                    activityRef.get().enterScanningMode();
                }

                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                StringBuilder builder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null)
                {
                    builder.append(line);
                }

                // Cleans any old reference to mObjectData
                if (activityRef.get().mObjectData != null)
                {
                    activityRef.get().mObjectData = null;

                }

                JSONObject jsonObject = new JSONObject(builder.toString());

                // Generates a new Object Object with the JSON object data
                activityRef.get().mObjectData = new RealObject();

                activityRef.get().mObjectData.setId(jsonObject.getLong("id"));
                activityRef.get().mObjectData.setName(jsonObject.getString("name"));
                activityRef.get().mObjectData.setDescription(jsonObject.getString("description"));
                activityRef.get().mObjectData.setImage(jsonObject.getString("image"));
                activityRef.get().mObjectData.setLatitude(jsonObject.getDouble("latitude"));
                activityRef.get().mObjectData.setLongitude(jsonObject.getDouble("longitude"));

                Note note=new Note();
                JSONArray jArray =jsonObject.getJSONArray("notes");
                if (jArray != null) {
                    for (int i=0;i<jArray.length();i++){
                        note.setId(jArray.getJSONObject(i).getLong("id"));
                        note.setContent(jArray.getJSONObject(i).getString("content"));
                        note.setFiles(jArray.getJSONObject(i).getString("files"));
                        activityRef.get().mObjectData.addNote(note);
                    }
                }
                // Gets the object thumb
                String imageUrl = mServerURL+"/FileHandlerServlet?filename=" +activityRef.get().mObjectData.getImage();
                byte[] thumb = activityRef.get().downloadImage(imageUrl);

                if (thumb != null)
                {

                    Bitmap bitmap = BitmapFactory.decodeByteArray(thumb, 0,
                            thumb.length);
                    activityRef.get().mObjectData.setThumb(bitmap);
                }
            } catch (Exception e)
            {
                Log.d(LOGTAG, "Couldn't get objects. e: " + e);
            } finally
            {
                connection.disconnect();
            }

            return null;
        }


        protected void onProgressUpdate(Void... values)
        {

        }


        protected void onPostExecute(Void result)
        {
            if (activityRef.get().mObjectData != null)
            {
                // Generates a View to display the object data
                RealObjectOverlayView productView = new RealObjectOverlayView(
                        activityRef.get().getApplicationContext());

                // Updates the view used as a 3d Texture
                activityRef.get().updateProductView(productView, activityRef.get().mObjectData);

                // Sets the layout params
                productView.setLayoutParams(new LayoutParams(
                        RelativeLayout.LayoutParams.WRAP_CONTENT,
                        RelativeLayout.LayoutParams.WRAP_CONTENT));

                // Sets View measure - This size should be the same as the
                // texture generated to display the overlay in order for the
                // texture to be centered in screen
                productView.measure(MeasureSpec.makeMeasureSpec(mTextureSize,
                        MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec(
                        mTextureSize, MeasureSpec.EXACTLY));

                // updates layout size
                productView.layout(0, 0, productView.getMeasuredWidth(),
                        productView.getMeasuredHeight());

                // Draws the View into a Bitmap. Note we are allocating several
                // large memory buffers thus attempt to clear them as soon as
                // they are no longer required:
                Bitmap bitmap = Bitmap.createBitmap(mTextureSize, mTextureSize,
                        Bitmap.Config.ARGB_8888);

                Canvas c = new Canvas(bitmap);
                productView.draw(c);

                // Clear the product view as it is no longer needed
                productView = null;
                System.gc();

                // Allocate int buffer for pixel conversion and copy pixels
                int width = bitmap.getWidth();
                int height = bitmap.getHeight();

                int[] data = new int[bitmap.getWidth() * bitmap.getHeight()];
                bitmap.getPixels(data, 0, bitmap.getWidth(), 0, 0,
                        bitmap.getWidth(), bitmap.getHeight());

                // Recycle the bitmap object as it is no longer needed
                bitmap.recycle();
                bitmap = null;
                c = null;
                System.gc();

                // Generates the Texture from the int buffer
                activityRef.get().mObjectDataTexture = Texture.loadTextureFromIntBuffer(data,
                        width, height);

                // Clear the int buffer as it is no longer needed
                data = null;
                System.gc();

                // Hides the loading dialog from a UI thread
                activityRef.get().loadingDialogHandler.sendEmptyMessage(HIDE_LOADING_DIALOG);

                activityRef.get().mIsLoadingObjectData = false;

                activityRef.get().productTextureIsCreated();
            }
        }
    }


    /**
     * Downloads and image from an Url specified as a paremeter returns the
     * array of bytes with the image Data for storing it on the Local Database
     */
    private byte[] downloadImage(final String imageUrl)
    {
        ByteArrayOutputStream baos = null;

        try
        {
            URL url = new URL(imageUrl);
            URLConnection ucon = url.openConnection();
            InputStream is = ucon.getInputStream();
            BufferedInputStream bis = new BufferedInputStream(is, 128);
            baos = new ByteArrayOutputStream(128);

            // get the bytes one by one
            int current = 0;
            while ((current = bis.read()) != -1)
            {
                baos.write((byte) current);
            }
        } catch (Exception e)
        {
            e.printStackTrace();
        }

        if (baos == null)
        {
            return null;
        } else
        {
            return baos.toByteArray();
        }
    }


    /** Returns the current Object Data Texture */
    public Texture getProductTexture()
    {
        return mObjectDataTexture;
    }


    /** Updates a ObjectOverlayView with the Object data specified in parameters */
    private void updateProductView(RealObjectOverlayView productView, RealObject object)
    {
        productView.setObjectName(object.getName());
        String temp="";
       // for (int i = 0; i < object.getNotes().size(); i++) {
        //   temp = temp + "<tr><td>" + object.getNotes().get(i).getContent() + "</td></tr>";
        //}
       // productView.setObjectDescription("<b>Beschreibung:</b><br>"+object.getDescription()+"<br><b>Notizen:</b><br>"+temp);
        productView.setObjectDescription(object.getDescription());
        productView.setCoverViewFromBitmap(object.getThumb());
    }


    /**
     * Starts application content Mode Displays UI OVerlays and turns Cloud
     * Recognition off
     */
    public void enterContentMode()
    {
        // Updates state variables
        mObjectInfoStatus = ObjectINFO_IS_DISPLAYED;

        // Shows the 2D Overlay
        show2DOverlay();

        // Enters content mode to disable Cloud Recognition
        if (mTargetFinder == null)
        {
            Log.d(LOGTAG, "Tried to stop TargetFinder but was not initialized");
            return;
        }
        mTargetFinder.stop();

        scanlineStop();

        // Remember we are in content mode:
        mRenderer.setScanningMode(false);
    }


    /** Hides the 2D Overlay view and starts C service again */
    private void enterScanningMode()
    {
        // Hides the 2D Overlay
        hide2DOverlay();

        // Enables Cloud Recognition Scanning Mode
        if (mTargetFinder == null)
        {
            Log.e(LOGTAG, "Tried to start TargetFinder but was not initialized");
            return;
        }
        mTargetFinder.startRecognition();

        // Clear all trackables created previously:
        mTargetFinder.clearTrackables();

        mRenderer.setScanningMode(true);
        scanlineStart();

        // Updates state variables
        mRenderer.showAnimation3Dto2D(false);
        mRenderer.isShowing2DOverlay(false);
        mRenderer.setRenderState(ObjectsRenderer.RS_SCANNING);
    }


    /** Displays the 2D Object Overlay */
    public void show2DOverlay()
    {
        // Sends the Message to the Handler in the UI thread
        overlay2DHandler.sendEmptyMessage(SHOW_2D_OVERLAY);
    }


    /** Hides the 2D Object Overlay */
    public void hide2DOverlay()
    {
        // Sends the Message to the Handler in the UI thread
        overlay2DHandler.sendEmptyMessage(HIDE_2D_OVERLAY);
    }


    public boolean onTouchEvent(MotionEvent event)
    {
        // Process the Gestures
        return mGestureDetector.onTouchEvent(event);
    }

    // Process Double Tap event for showing the Camera options menu
    private class GestureListener extends
            GestureDetector.SimpleOnGestureListener
    {
        // Used to set autofocus one second after a manual focus is triggered
        private final Handler autofocusHandler = new Handler();

        public boolean onDown(MotionEvent e)
        {
            return true;
        }


        public boolean onSingleTapUp(MotionEvent event)
        {

            // If the object info is not displayed it performs an Autofocus
            if (mObjectInfoStatus == ObjectINFO_NOT_DISPLAYED)
            {
                boolean result = CameraDevice.getInstance().setFocusMode(
                        CameraDevice.FOCUS_MODE.FOCUS_MODE_TRIGGERAUTO);
                if (!result)
                    Log.e("SingleTapUp", "Unable to trigger focus");

                // Generates a Handler to trigger continuous auto-focus
                // after 1 second
                autofocusHandler.postDelayed(new Runnable()
                {
                    public void run()
                    {
                        final boolean autofocusResult = CameraDevice.getInstance().setFocusMode(
                                CameraDevice.FOCUS_MODE.FOCUS_MODE_CONTINUOUSAUTO);

                        if (!autofocusResult)
                            Log.e("SingleTapUp", "Unable to re-enable continuous auto-focus");
                    }
                }, 1000L);

                // If the object info is displayed it shows the object data web view
            } else if (mObjectInfoStatus == ObjectINFO_IS_DISPLAYED)
            {

                float x = event.getX(0);
                float y = event.getY(0);

                DisplayMetrics metrics = new DisplayMetrics();
                getWindowManager().getDefaultDisplay().getMetrics(metrics);

                // Creates a Bounding box for detecting touches
                float screenLeft = metrics.widthPixels / 8.0f;
                float screenRight = metrics.widthPixels * 0.8f;
                float screenUp = metrics.heightPixels / 7.0f;
                float screenDown = metrics.heightPixels * 0.7f;

                // Checks touch inside the bounding box
                if (x < screenRight && x > screenLeft && y < screenDown
                        && y > screenUp)
                {
                    // Starts the webView
                    startWebView(0);
                    scanlineStart();
                }
            }

            return true;
        }
    }


    @Override
    public boolean doLoadTrackersData()
    {
        Log.d(LOGTAG, "initObjects");

        // Get the object tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());

        // Initialize target finder:
        TargetFinder targetFinder = objectTracker.getTargetFinder();
        targetFinder.startInit(kAccessKey, kSecretKey);

        // Start initialization:
        targetFinder.waitUntilInitFinished();

        int resultCode = targetFinder.getInitState();
        if (resultCode != TargetFinder.INIT_SUCCESS)
        {
            if(resultCode == TargetFinder.INIT_ERROR_NO_NETWORK_CONNECTION)
            {
                mInitErrorCode = UPDATE_ERROR_NO_NETWORK_CONNECTION;
            }
            else
            {
                mInitErrorCode = UPDATE_ERROR_SERVICE_NOT_AVAILABLE;
            }

            Log.e(LOGTAG, "Failed to initialize target finder.");
            return false;
        }
        scanlineStart();
        mTargetFinder = targetFinder;

        return true;
    }


    @Override
    public boolean doUnloadTrackersData()
    {
        return true;
    }


    @Override
    public void onInitARDone(SampleApplicationException exception)
    {

        if (exception == null)
        {
            initApplicationAR();

            // Now add the GL surface view. It is important
            // that the OpenGL ES surface view gets added
            // BEFORE the camera is started and video
            // background is configured.
            addContentView(mGlView, new LayoutParams(LayoutParams.MATCH_PARENT,
                    LayoutParams.MATCH_PARENT));

            // Start the camera:
            vuforiaAppSession.startAR(CameraDevice.CAMERA_DIRECTION.CAMERA_DIRECTION_DEFAULT);

            mRenderer.setActive(true);

            mUILayout.bringToFront();

            // Hides the Loading Dialog
            loadingDialogHandler.sendEmptyMessage(HIDE_LOADING_DIALOG);

            mUILayout.setBackgroundColor(Color.TRANSPARENT);

        } else
        {
            Log.e(LOGTAG, exception.getString());
            if(mInitErrorCode != 0)
            {
                showErrorMessage(mInitErrorCode,10, true);
            }
            else
            {
                showInitializationErrorMessage(exception.getString());
            }
        }
    }

    @Override
    public void onVuforiaResumed()
    {
        if (mGlView != null)
        {
            mGlView.setVisibility(View.VISIBLE);
            mGlView.onResume();
        }
    }

    @Override
    public void onVuforiaStarted()
    {
        mRenderer.updateRenderingPrimitives();

        // Set camera focus mode
        if(!CameraDevice.getInstance().setFocusMode(CameraDevice.FOCUS_MODE.FOCUS_MODE_CONTINUOUSAUTO))
        {
            // If continuous autofocus mode fails, attempt to set to a different mode
            if(!CameraDevice.getInstance().setFocusMode(CameraDevice.FOCUS_MODE.FOCUS_MODE_TRIGGERAUTO))
            {
                CameraDevice.getInstance().setFocusMode(CameraDevice.FOCUS_MODE.FOCUS_MODE_NORMAL);
            }
        }

        showProgressIndicator(false);
    }


    public void showProgressIndicator(boolean show)
    {
        if (loadingDialogHandler != null)
        {
            if (show)
            {
                loadingDialogHandler
                        .sendEmptyMessage(LoadingDialogHandler.SHOW_LOADING_DIALOG);
            }
            else
            {
                loadingDialogHandler
                        .sendEmptyMessage(LoadingDialogHandler.HIDE_LOADING_DIALOG);
            }
        }
    }


    // Shows initialization error messages as System dialogs
    public void showInitializationErrorMessage(String message)
    {
        final String errorMessage = message;
        runOnUiThread(new Runnable()
        {
            public void run()
            {
                if (mErrorDialog != null)
                {
                    mErrorDialog.dismiss();
                }

                // Generates an Alert Dialog to show the error message
                AlertDialog.Builder builder = new AlertDialog.Builder(
                        Objects.this);
                builder
                        .setMessage(errorMessage)
                        .setTitle(getString(R.string.INIT_ERROR))
                        .setCancelable(false)
                        .setIcon(0)
                        .setPositiveButton("OK",
                                new DialogInterface.OnClickListener()
                                {
                                    public void onClick(DialogInterface dialog, int id)
                                    {
                                        finish();
                                    }
                                });

                mErrorDialog = builder.create();
                mErrorDialog.show();
            }
        });
    }


    @Override
    public void onVuforiaUpdate(State state)
    {
        if (mTargetFinder == null)
        {
            Log.e(LOGTAG, "Tried to query TargetFinder but was not initialized");
            return;
        }

        // Get the target finder:
        TargetFinder finder = mTargetFinder;

        // Check if there are new results available:
        TargetFinderQueryResult queryResult = finder.updateQueryResults();
        int queryStatus = queryResult.getStatus();

        // Show a message if we encountered an error:
        if (queryStatus < 0)
        {

            boolean closeAppAfterError = (
                    queryStatus == UPDATE_ERROR_NO_NETWORK_CONNECTION ||
                            queryStatus == UPDATE_ERROR_SERVICE_NOT_AVAILABLE);

            showErrorMessage(queryStatus, state.getFrame().getTimeStamp(), closeAppAfterError);

        }
        else if (queryStatus == TargetFinder.UPDATE_RESULTS_AVAILABLE)
        {
            // Process new search results
            if (!queryResult.getResults().empty())
            {
                TargetSearchResult result = queryResult.getResults().at(0);

                // Check if this target is suitable for tracking:
                if (result.getTrackingRating() > 0)
                {
                    // Create a new Trackable from the result:
                    Trackable newTrackable = finder.enableTracking(result);
                    if (newTrackable != null)
                    {
                        Log.d(LOGTAG, "Successfully created new trackable '"
                                + newTrackable.getName() + "' with rating '"
                                + result.getTrackingRating() + "'.");

                        // Checks if the targets has changed
                        Log.d(LOGTAG, "Comparing Strings. currentTargetId: "
                                + result.getUniqueTargetId() + "  lastTargetId: "
                                + lastTargetId);

                        if (!result.getUniqueTargetId().equals(lastTargetId))
                        {
                            // If the target has changed then regenerate the
                            // texture
                            // Cleaning this value indicates that the product
                            // Texture needs to be generated
                            // again in Java with the new Object data for the new
                            // target
                            mRenderer.deleteCurrentProductTexture();

                            // Starts the loading state for the product
                            mRenderer
                                    .setRenderState(ObjectsRenderer.RS_LOADING);

                            // Calls the Java method with the current product
                            // texture
                            createProductTexture(result.getMetaData());

                        } else
                            mRenderer
                                    .setRenderState(ObjectsRenderer.RS_NORMAL);

                        // Initialize the frames to skip variable, used for
                        // waiting
                        // a few frames for getting the chance to tracking
                        // before
                        // starting the transition to 2D when there is no target
                        mRenderer.setFramesToSkipBeforeRenderingTransition(10);

                        // Initialize state variables
                        mRenderer.showAnimation3Dto2D(true);
                        mRenderer.resetTrackingStarted();

                        // Updates the value of the current Target Id with the
                        // new target found
                        synchronized (lastTargetId)
                        {
                            lastTargetId = result.getUniqueTargetId();
                        }

                        enterContentMode();
                    } else
                        Log.e(LOGTAG, "Failed to create new trackable.");
                }
            }
        }
    }


    @Override
    public boolean doInitTrackers()
    {
        TrackerManager tManager = TrackerManager.getInstance();
        Tracker tracker;

        // Indicate if the trackers were initialized correctly
        boolean result = true;

        tracker = tManager.initTracker(ObjectTracker.getClassType());
        if (tracker == null)
        {
            Log.e(
                    LOGTAG,
                    "Tracker not initialized. Tracker already initialized or the camera is already started");
            result = false;
        } else
        {
            Log.i(LOGTAG, "Tracker successfully initialized");
        }

        return result;
    }


    @Override
    public boolean doStartTrackers()
    {
        // Indicate if the trackers were started correctly
        boolean result = true;

        // Start the tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());
        objectTracker.start();

        // Start cloud based recognition if we are in scanning mode:
        if (mRenderer.getScanningMode())
        {
            if (mTargetFinder == null)
            {
                Log.e(LOGTAG, "Tried to start TargetFinder but was not initialized");
                return false;
            }
            mTargetFinder.startRecognition();
        }

        return result;
    }


    @Override
    public boolean doStopTrackers()
    {
        // Indicate if the trackers were stopped correctly
        boolean result = true;

        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());

        if(objectTracker != null)
        {
            objectTracker.stop();

            // Stop cloud based recognition:
            if (mTargetFinder == null)
            {
                Log.e(LOGTAG, "Tried to stop TargetFinder but was not initialized");
                return false;
            }
            mTargetFinder.stop();

            // Clears the trackables
            mTargetFinder.clearTrackables();
        }
        else
        {
            result = false;
        }

        return result;
    }


    @Override
    public boolean doDeinitTrackers()
    {
        // Indicate if the trackers were deinitialized correctly
        boolean result = true;

        TrackerManager tManager = TrackerManager.getInstance();
        tManager.deinitTracker(ObjectTracker.getClassType());

        return result;
    }

    private void scanlineStart() {
        this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                scanLine.setVisibility(View.VISIBLE);
                scanLine.setAnimation(scanAnimation);
                scanLineStarted = true;
            }
        });
    }

    private void scanlineStop() {
        this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                scanLine.setVisibility(View.GONE);
                scanLine.clearAnimation();
                scanLineStarted = false;
            }
        });
    }

    private void scanCreateAnimation() {
        final int orientation = getResources().getConfiguration().orientation;

        Display display = getWindowManager().getDefaultDisplay();
        int screenHeight = display.getHeight();

        if (orientation == Configuration.ORIENTATION_PORTRAIT) {
            scanAnimation = new TranslateAnimation(
                    TranslateAnimation.ABSOLUTE, 0f,
                    TranslateAnimation.ABSOLUTE, 0f,
                    TranslateAnimation.RELATIVE_TO_PARENT, 0f,
                    TranslateAnimation.ABSOLUTE, screenHeight);
            scanAnimation.setDuration(4000);
        } else {
            scanAnimation = new TranslateAnimation(
                    TranslateAnimation.ABSOLUTE, 0f,
                    TranslateAnimation.ABSOLUTE, 0f,
                    TranslateAnimation.ABSOLUTE, screenHeight,
                    TranslateAnimation.RELATIVE_TO_PARENT, 0f);
            scanAnimation.setDuration(2000);
        }

        scanAnimation.setRepeatCount(-1);
        scanAnimation.setRepeatMode(Animation.REVERSE);
        scanAnimation.setInterpolator(new LinearInterpolator());

        // if the animation was in progress we need to restart it
        // to take into account the new configuration
        if (scanLineStarted) {
            scanlineStop();
            scanlineStart();
        }
    }
}
