# Installing Wildfly on Ubuntu

    #!/bin/bash
    mkdir -p /opt/wildfly
    pushd /opt/wildfly
    #wget http://download.jboss.org/wildfly/14.0.1.Final/wildfly-14.0.1.Final.tar.gz
    wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.12.tar.gz
    tar -xzf mysql*.tar.gz
    tar -xzf wild*.tar.gz
    find /opt/wildfly -type d -name "wildfly*" -exec mv {} wildfly \;
    groupadd jboss
    useradd -g jboss jboss
    usermod --shell /bin/bash jboss
    usermod --home /opt/wildfly jboss
    mkdir -p /var/log/jboss
    chown -R jboss:jboss /var/log/jboss
    rm -rf /opt/wildfly/wildfly/standalone/log
    
    ln -s /var/log/jboss /opt/wildfly/wildfly/standalone/log
    chown -R jboss:jboss /opt/wildfly

    su - jboss /opt/wildfly/wildfly/bin/jboss-cli.sh
    embed-server --std-out=echo --server-config=standalone.xml
    batch
    /subsystem=datasources/jdbc-driver=mysql:add(driver-name="mysql",driver-module-name="com.mysql",driver-class-name=com.mysql.jdbc.Driver)
    run-batch
    quit
Now open the Admin Console and add a Database Connection

		

