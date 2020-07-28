package entity;

import io.swagger.annotations.ApiModel;

/**
 * Each User has a Role Is used for checking Permissions
 *
 * @author Christopher G
 */
@ApiModel(value = "Role", description = "Roles in Footnote")
public enum Role {

    /**
     *
     */
    GUEST,
    /**
     *
     */
    USER,
    /**
     *
     */
    MODERATOR,
    /**
     *
     */
    ADMINISTRATOR,

}
