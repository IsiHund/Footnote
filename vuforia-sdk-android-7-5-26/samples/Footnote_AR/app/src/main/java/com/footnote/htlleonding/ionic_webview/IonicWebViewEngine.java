package com.footnote.htlleonding.ionic_webview;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.annotation.TargetApi;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;

import com.vuforia.Objects.app.Objects.Objects;

import org.apache.cordova.ConfigXmlParser;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPreferences;
import org.apache.cordova.CordovaResourceApi;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewEngine;
import org.apache.cordova.NativeToJsMessageQueue;
import org.apache.cordova.PluginManager;
import org.apache.cordova.engine.SystemWebView;
import org.apache.cordova.engine.SystemWebViewClient;
import org.apache.cordova.engine.SystemWebViewEngine;

public class IonicWebViewEngine extends SystemWebViewEngine {
    public static final String TAG = "IonicWebViewEngine";

    private WebViewLocalServer localServer;
    private String CDV_LOCAL_SERVER;
    private static final String LAST_BINARY_VERSION_CODE = "lastBinaryVersionCode";
    private static final String LAST_BINARY_VERSION_NAME = "lastBinaryVersionName";


    static final String PROTOCOL = "app://";
    public static final String RESULT = TAG + "_result";
    private static final int REQUEST_CODE_WEBVIEW = 3146;

    public Context context;

    /**
     * Used when created via reflection.
     */
    public IonicWebViewEngine(Context context, CordovaPreferences preferences) {
        super(new SystemWebView(context), preferences);
        this.context = context;
        Log.d(TAG, "Ionic Web View Engine Starting Right Up 1...");
    }

    public IonicWebViewEngine(SystemWebView webView) {
        super(webView, null);
        Log.d(TAG, "Ionic Web View Engine Starting Right Up 2...");
    }

    public IonicWebViewEngine(SystemWebView webView, CordovaPreferences preferences) {
        super(webView, preferences);
        Log.d(TAG, "Ionic Web View Engine Starting Right Up 3...");
    }

    @Override
    public void init(CordovaWebView parentWebView, CordovaInterface cordova, final CordovaWebViewEngine.Client client,
                     CordovaResourceApi resourceApi, PluginManager pluginManager,
                     NativeToJsMessageQueue nativeToJsMessageQueue) {
        ConfigXmlParser parser = new ConfigXmlParser();
        parser.parse(cordova.getActivity());

        String port = preferences.getString("WKPort", "8080");
        CDV_LOCAL_SERVER = "http://localhost:" + port;

        localServer = new WebViewLocalServer(cordova.getActivity(), "localhost:" + port, true, parser);
        WebViewLocalServer.AssetHostingDetails ahd = localServer.hostAssets("www");

        webView.setWebViewClient(new ServerClient(this, parser));

        super.init(parentWebView, cordova, client, resourceApi, pluginManager, nativeToJsMessageQueue);
        SharedPreferences prefs = cordova.getActivity().getApplicationContext().getSharedPreferences(IonicWebView.WEBVIEW_PREFS_NAME, Activity.MODE_PRIVATE);
        String path = prefs.getString(IonicWebView.CDV_SERVER_PATH, null);
        if (!isDeployDisabled() && !isNewBinary() && path != null && !path.isEmpty()) {
            setServerBasePath(path);
        }
    }

    private boolean isNewBinary() {
        String versionCode = "";
        String versionName = "";
        SharedPreferences prefs = cordova.getActivity().getApplicationContext().getSharedPreferences(IonicWebView.WEBVIEW_PREFS_NAME, Activity.MODE_PRIVATE);
        String lastVersionCode = prefs.getString(LAST_BINARY_VERSION_CODE, null);
        String lastVersionName = prefs.getString(LAST_BINARY_VERSION_NAME, null);

        try {
            PackageInfo pInfo = this.cordova.getActivity().getPackageManager().getPackageInfo(this.cordova.getActivity().getPackageName(), 0);
            versionCode = Integer.toString(pInfo.versionCode);
            versionName = pInfo.versionName;
        } catch (Exception ex) {
            Log.e(TAG, "Unable to get package info", ex);
        }

        if (!versionCode.equals(lastVersionCode) || !versionName.equals(lastVersionName)) {
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(LAST_BINARY_VERSION_CODE, versionCode);
            editor.putString(LAST_BINARY_VERSION_NAME, versionName);
            editor.putString(IonicWebView.CDV_SERVER_PATH, "");
            editor.apply();
            return true;
        }
        return false;
    }

    private boolean isDeployDisabled() {
        return preferences.getBoolean("DisableDeploy", false);
    }

    private class ServerClient extends SystemWebViewClient {
        private ConfigXmlParser parser;

        public ServerClient(SystemWebViewEngine parentEngine, ConfigXmlParser parser) {
            super(parentEngine);
            this.parser = parser;
        }

        @TargetApi(Build.VERSION_CODES.KITKAT)
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
            return localServer.shouldInterceptRequest(Uri.parse(url));
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            String launchUrl = parser.getLaunchUrl();
            if (!launchUrl.contains("http") && url.equals(launchUrl)) {
                view.stopLoading();
                view.loadUrl(CDV_LOCAL_SERVER);
            }
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            view.loadUrl("javascript:(function() { " +
                    "window.WEBVIEW_SERVER_URL = '" + CDV_LOCAL_SERVER + "'" +
                    "})()");
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            boolean should = true;

            if (should) {
                if (url.startsWith(PROTOCOL)) {
                    Log.d(TAG, "navigate back to app: " + url);
                    should = false;
                    returnFromActivity(url.substring(PROTOCOL.length()));
                } else {
                    Log.d(TAG, "navigate OK " + url);
                }
            }
            return should;
        }
    }


    public void setServerBasePath(String path) {
        localServer.hostFiles(path);
        webView.loadUrl(CDV_LOCAL_SERVER);
    }

    public String getServerBasePath() {
        return this.localServer.getBasePath();
    }

    private void returnFromActivity(String query) {
        //Intent intent = new Intent();
        //intent.putExtra(RESULT, query);
        Log.d(TAG, "return query " + query + " to calling activity");
        Intent intent = new Intent(this.context, Objects.class);
        intent.putExtra(RESULT, query);
        this.context.startActivity(intent);


        //Toast toast = Toast.makeText(this, "result received:" + data.getStringExtra(IonicWebViewEngine.RESULT), Toast.LENGTH_LONG);
        //toast.show();
        //Intent intent = new Intent(IonicWebView.class, UnityPlayerActivity.class);
        //startActivityForResult(intent, REQUEST_CODE_WEBVIEW);
        //setResult(RESULT_OK, intent);
        //finish();
    }
}
