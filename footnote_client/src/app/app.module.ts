import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { MaterialIconsModule } from 'ionic2-material-icons';
import { AddInfoPage } from '../pages/add-info/add-info';
import { DialogPage } from '../pages/dialog/dialog';
import { RegisterPage } from '../pages/register/register';
import { AddObjectPage } from '../pages/add-object/add-object';
import { QuillModule } from 'ngx-quill';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { AuthService } from '../pages/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor, InterceptorModule } from '../pages/auth/token.interceptor';
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { HttpAngularProvider } from '../providers/http-angular/http-angular';
import { HttpNativeProvider } from '../providers/http-native/http-native';
import { HttpProvider } from '../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../pages/tabs/tabs';
import { NavProxyService } from '../services/navProxy.service';
import { PlaceholderPage } from '../pages/placeholder/placeholder';
import { MasterPage } from '../pages/master/master';
import { IonicImageLoader } from 'ionic-image-loader';
import { UserGroupPage } from '../pages/user-group/user-group';
import { FeedPage } from '../pages/feed/feed';
import { UserGroupSplitPage } from '../pages/user-group-split/user-group-split';
import { NavProxyUserGroupService } from '../services/navProxyUserGroup.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    AddInfoPage,
    DialogPage,
    AddObjectPage,
    LoginPage,
    RegisterPage,
    TabsPage,
    PlaceholderPage,
    MasterPage,
    UserGroupPage,
    FeedPage,
    UserGroupSplitPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: MasterPage, name: 'Master', segment: 'master' },
        { component: TabsPage, name: 'Tabs', segment: 'tabs' },
        { component: LoginPage, name: 'Login', segment: 'login' },
        { component: DetailPage, name: 'Detail', segment: 'detail', defaultHistory: [HomePage] },
        { component: AddObjectPage, name: 'page-add-object', segment: 'addObject', defaultHistory: [HomePage] }
      ]
    }),
    QuillModule,
    InterceptorModule,
    MaterialIconsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    AddInfoPage,
    DialogPage,
    AddObjectPage,
    LoginPage,
    RegisterPage,
    TabsPage,
    PlaceholderPage,
    MasterPage,
    UserGroupPage,
    FeedPage,
    UserGroupSplitPage
  ],
  providers: [
    StatusBar,
    AuthService,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    RestProvider,
    Geolocation,
    AuthProvider,
    Camera,
    HTTP,
    HttpAngularProvider,
    HttpNativeProvider,
    HttpProvider,
    NativeStorage,
    NavProxyService,
    NavProxyUserGroupService
  ]
})
export class AppModule { }
