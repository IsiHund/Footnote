# What´s Footnote?


Augmented Reality, Neural Networks, Smart Devices, Smart Home, Industry 4.0 and the Internet of Things are a collection of topics that are currently widely discussed. Companies worldwide aim to integrate object recognition into their products. However, some of these technologies are quite difficult to use for developers, because dealing with frameworks is not very intuitive and they are sometimes lacklusterly documented. There are several restrictions in terms of how long objects can be saved, or how open these frameworks are. Furthermore, most of the existing solutions are not extensible by self-made objects, they only detect predefined items. The goal of Footnote was to provide a possibility for technically inept users to save and relate information to real objects (things).

A first subgoal for the app was recognizing industrial machines and linking them together with digital information like notes or user manuals. Users can also create new real objects themselves – here the focus was put on minimizing a need for technical experience. Additionally, if there is text visible on items, it gets detected and saved.

The application was realized in a Client-Server architecture. The "Vuforia" Framework was used for object recognition, because of superior detection quality and good compatibility with Client-Server architecture, which alternatives did not provide to the same extent. The client is based on "Ionic" for cross-platform programming, the object recognition with Vuforia was programmed natively in "Android". Java Enterprise was used server-sided, because it is a reliable language with a large array of libraries. Furthermore, "Tesseract" is used for text-detection. In reality, the client is similar to a note-taking app like “Evernote” or “Onenote” with the additional functionality discussed above.

With the finished product, the Footnote App, the User can take pictures of real objects like paintings, landmarks, industrial components, devices and more and link these to digital information like the artist, their creation history, user manuals, maintenance plans or circuit diagrams. These can be displayed in the shape of text, pictures or files. The app can then detect objects with the help of the devices camera and display the previously mentioned information.

The recognition of objects is already used in lots of currently running systems around the world, but Footnote takes one step further and gives every user the chance to link objects of the real world to digital information that can be recognized again.

# Clientside
Ionic + Angular + Vuforia with Android

The Ionic project is in the folder footnote_client.
The Android Vuforia project is in the directory vuforia-sdk-android-7-5-26\samples\Footnote_AR.

To use the Ionic part in Android, you have to build android and copy footnote\_client\platforms\android\app\src\main\assets\www into vuforia-sdk-android-7-5-26\samples\Footnote_AR\app\src\main\assets\www.

install Ionic:
npm install -g ionic

install all components for the project:
npm install

build Ionic for Android and run on Smartohone:
ionic cordova run android --device

run Ionic:
ionic serve

# Serverside

Footnote is a Java EE Maven Project, hosted on a Wildfly 14.01 instance together with a Mysql database.

## Running the Project - Serverside
Easiest way to run Footnote is with an IDE like Netbeans. Just import it into Netbeans and deploy it on a local development Wildfly instance with an added MySQL Database.

To do so you first need to add the Wildfly Server under the Server Tab in Netbeans, when you try to run the Project it will then ask you to choose which Server you want to use.

You can also use Maven to do so, the command looks like this:

    mvn wildfly:deploy


### Debugging

Rightclick on the Wildfly Server and click "start in Debug mode". You can debug as you would do with a normal Java Se Project.

## Deployment for Production
Ubuntu Server with the url http://vm68.htl-leonding.ac.at:80 runs a Wildfly Server with a Database. To Deploy the Project there you need to to several things:

 1. Clean & Build the Project in Netbeans or with Maven
 2. Locate the footnote.war in the project directory, copy it - if you want the server to serve the client too, 
add the /dist folder of the client into the webcontent of the Netbeans-Project before building.
 3. Login the Admin Interface on Port 9990 - you might have to Tunnel the IP Adress of the Servers 9990 Port to localhost:9990
 to be able to access it, this can be done with for example [Putty](https://www.putty.org/)
 4. Click on Deployments and add a new deployment, where you drag and drop the war file - dont forget to enable the deployment!
 5. If you get a success message, you can now access  for example the REST Test Method on http://vm68.htl-leonding.ac.at:80/footnote/rest/json
