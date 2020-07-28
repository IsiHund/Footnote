/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logic;

import javax.enterprise.inject.spi.InjectionPoint;

import org.apache.log4j.Logger;

import javax.enterprise.inject.Produces;

public class LogFactory {

    @Produces
    Logger createLogger(InjectionPoint injectionPoint) {
        String name = injectionPoint.getMember().getDeclaringClass().getName();
        return Logger.getLogger(name);
    }
}
