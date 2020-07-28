/*===============================================================================
Copyright (c) 2016-2018 PTC Inc. All Rights Reserved.

Copyright (c) 2012-2014 Qualcomm Connected Experiences, Inc. All Rights Reserved.

Vuforia is a trademark of PTC Inc., registered in the United States and other 
countries.
===============================================================================*/

package com.vuforia.Objects.app.Objects;

import com.footnote.htlleonding.R;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.sufficientlysecure.htmltextview.HtmlTextView;

// Custom View with Object Overlay Data
public class RealObjectOverlayView extends RelativeLayout
{
    public RealObjectOverlayView(Context context)
    {
        this(context, null);
    }
    
    
    public RealObjectOverlayView(Context context, AttributeSet attrs)
    {
        this(context, attrs, 0);
    }
    
    
    public RealObjectOverlayView(Context context, AttributeSet attrs, int defStyle)
    {
        super(context, attrs, defStyle);
        inflateLayout(context);
        
    }
    
    
    // Inflates the Custom View Layout
    private void inflateLayout(Context context)
    {
        
        final LayoutInflater inflater = LayoutInflater.from(context);
        
        // Generates the layout for the view
        inflater.inflate(R.layout.bitmap_layout, this, true);
    }
    
    
    // Sets Object title in View
    public void setObjectName(String ObjectName)
    {
        TextView tv = findViewById(R.id.custom_view_name);
        tv.setText(ObjectName);
    }
    
    
    // Sets Object Description in View
    public void setObjectDescription(String ObjectDescription)
    {
        HtmlTextView wv = findViewById(R.id.custom_view_description);
        wv.setHtml(ObjectDescription);
    }

    
    // Sets Object Cover in View from a bitmap
    public void setCoverViewFromBitmap(Bitmap coverObject)
    {
        ImageView iv = findViewById(R.id.custom_view_object_cover);
        iv.setImageBitmap(coverObject);
    }

}
