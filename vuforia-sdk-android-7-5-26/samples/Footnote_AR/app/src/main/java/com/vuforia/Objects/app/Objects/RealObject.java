/*===============================================================================
Copyright (c) 2016,2018 PTC Inc. All Rights Reserved.

Copyright (c) 2012-2014 Qualcomm Connected Experiences, Inc. All Rights Reserved.

Vuforia is a trademark of PTC Inc., registered in the United States and other 
countries.
===============================================================================*/

package com.vuforia.Objects.app.Objects;

import android.graphics.Bitmap;
import java.util.ArrayList;

// A support class encapsulating the info for one Object
public class RealObject
{
    private Long id;
    private String name;
    private String description;
    private double latitude;
    private double longitude;
    private String image;
    private ArrayList<Note> notes;
    private Bitmap thumb;
    
    
    public RealObject()
    {
        
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<Note> getNotes() {
        return notes;
    }

    public void setNotes(ArrayList<Note> notes) {
        this.notes = notes;
    }

    public void addNote(Note e) {
        notes.add(e);
    }

    public void removeNote(Note e) {
        notes.remove(e);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Bitmap getThumb()
    {
        return thumb;
    }

    public void setThumb(Bitmap thumb)
    {
        this.thumb = thumb;
    }

    public void recycle()
    {
        // Cleans the Thumb bitmap variable
        thumb.recycle();
        thumb = null;
    }

}
