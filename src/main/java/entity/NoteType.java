/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import io.swagger.annotations.ApiModel;

/**
 *
 * @author Christopher
 */
@ApiModel(value = "NoteType", description = "NoteTypes in Footnote")
public enum NoteType {
    TEXT,LINK,DATE,PICTURE,FILE
}
