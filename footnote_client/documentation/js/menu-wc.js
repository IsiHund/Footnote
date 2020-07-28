'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">footnote documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AddInfoPageModule.html" data-type="entity-link">AddInfoPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AddInfoPageModule-8c1d8ab2865f6b44631ba756198d8fd1"' : 'data-target="#xs-components-links-module-AddInfoPageModule-8c1d8ab2865f6b44631ba756198d8fd1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AddInfoPageModule-8c1d8ab2865f6b44631ba756198d8fd1"' :
                                            'id="xs-components-links-module-AddInfoPageModule-8c1d8ab2865f6b44631ba756198d8fd1"' }>
                                            <li class="link">
                                                <a href="components/AddInfoPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddInfoPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AddObjectPageModule.html" data-type="entity-link">AddObjectPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AddObjectPageModule-e830612fedab79e011bf27fb9ff30d51"' : 'data-target="#xs-components-links-module-AddObjectPageModule-e830612fedab79e011bf27fb9ff30d51"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AddObjectPageModule-e830612fedab79e011bf27fb9ff30d51"' :
                                            'id="xs-components-links-module-AddObjectPageModule-e830612fedab79e011bf27fb9ff30d51"' }>
                                            <li class="link">
                                                <a href="components/AddObjectPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddObjectPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4f8c287eea82d55c7a66ca04b9b36694"' : 'data-target="#xs-components-links-module-AppModule-4f8c287eea82d55c7a66ca04b9b36694"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4f8c287eea82d55c7a66ca04b9b36694"' :
                                            'id="xs-components-links-module-AppModule-4f8c287eea82d55c7a66ca04b9b36694"' }>
                                            <li class="link">
                                                <a href="components/ARViewPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ARViewPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddInfoPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddInfoPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddObjectPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddObjectPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CloudRecognitionPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CloudRecognitionPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeedPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeedPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MasterPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MasterPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyApp.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyApp</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlaceholderPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlaceholderPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserGroupPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserGroupPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserGroupSplitPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserGroupSplitPage</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-4f8c287eea82d55c7a66ca04b9b36694"' : 'data-target="#xs-injectables-links-module-AppModule-4f8c287eea82d55c7a66ca04b9b36694"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4f8c287eea82d55c7a66ca04b9b36694"' :
                                        'id="xs-injectables-links-module-AppModule-4f8c287eea82d55c7a66ca04b9b36694"' }>
                                        <li class="link">
                                            <a href="injectables/AuthProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpAngularProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HttpAngularProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpNativeProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HttpNativeProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HttpProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NavProxyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NavProxyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NavProxyUserGroupService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NavProxyUserGroupService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RestProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RestProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ARViewPageModule.html" data-type="entity-link">ARViewPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ARViewPageModule-5aea1f7577091d4b0c23c1c62bdc7d23"' : 'data-target="#xs-components-links-module-ARViewPageModule-5aea1f7577091d4b0c23c1c62bdc7d23"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ARViewPageModule-5aea1f7577091d4b0c23c1c62bdc7d23"' :
                                            'id="xs-components-links-module-ARViewPageModule-5aea1f7577091d4b0c23c1c62bdc7d23"' }>
                                            <li class="link">
                                                <a href="components/ARViewPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ARViewPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CloudRecognitionPageModule.html" data-type="entity-link">CloudRecognitionPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CloudRecognitionPageModule-9b6bbddeb73ea36a31965674c8c2f8fd"' : 'data-target="#xs-components-links-module-CloudRecognitionPageModule-9b6bbddeb73ea36a31965674c8c2f8fd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CloudRecognitionPageModule-9b6bbddeb73ea36a31965674c8c2f8fd"' :
                                            'id="xs-components-links-module-CloudRecognitionPageModule-9b6bbddeb73ea36a31965674c8c2f8fd"' }>
                                            <li class="link">
                                                <a href="components/CloudRecognitionPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CloudRecognitionPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DetailPageModule.html" data-type="entity-link">DetailPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DetailPageModule-6faa0c2950d0e3153c3e6067ebe2a8f4"' : 'data-target="#xs-components-links-module-DetailPageModule-6faa0c2950d0e3153c3e6067ebe2a8f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DetailPageModule-6faa0c2950d0e3153c3e6067ebe2a8f4"' :
                                            'id="xs-components-links-module-DetailPageModule-6faa0c2950d0e3153c3e6067ebe2a8f4"' }>
                                            <li class="link">
                                                <a href="components/DetailPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DialogPageModule.html" data-type="entity-link">DialogPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DialogPageModule-dded20748dd2c445950d07d3319952e0"' : 'data-target="#xs-components-links-module-DialogPageModule-dded20748dd2c445950d07d3319952e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DialogPageModule-dded20748dd2c445950d07d3319952e0"' :
                                            'id="xs-components-links-module-DialogPageModule-dded20748dd2c445950d07d3319952e0"' }>
                                            <li class="link">
                                                <a href="components/DialogPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeedPageModule.html" data-type="entity-link">FeedPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FeedPageModule-608848e698fef33365c76283fcd41ea3"' : 'data-target="#xs-components-links-module-FeedPageModule-608848e698fef33365c76283fcd41ea3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FeedPageModule-608848e698fef33365c76283fcd41ea3"' :
                                            'id="xs-components-links-module-FeedPageModule-608848e698fef33365c76283fcd41ea3"' }>
                                            <li class="link">
                                                <a href="components/FeedPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeedPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-ca96e001795320078feb6372e6b1352f"' : 'data-target="#xs-components-links-module-HomePageModule-ca96e001795320078feb6372e6b1352f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-ca96e001795320078feb6372e6b1352f"' :
                                            'id="xs-components-links-module-HomePageModule-ca96e001795320078feb6372e6b1352f"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InterceptorModule.html" data-type="entity-link">InterceptorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-e6e6e35334a18aab49a1c09fc17aa8b7"' : 'data-target="#xs-components-links-module-LoginPageModule-e6e6e35334a18aab49a1c09fc17aa8b7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-e6e6e35334a18aab49a1c09fc17aa8b7"' :
                                            'id="xs-components-links-module-LoginPageModule-e6e6e35334a18aab49a1c09fc17aa8b7"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MasterPageModule.html" data-type="entity-link">MasterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MasterPageModule-b3468898f3a6cd35bbf8556721e688a6"' : 'data-target="#xs-components-links-module-MasterPageModule-b3468898f3a6cd35bbf8556721e688a6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MasterPageModule-b3468898f3a6cd35bbf8556721e688a6"' :
                                            'id="xs-components-links-module-MasterPageModule-b3468898f3a6cd35bbf8556721e688a6"' }>
                                            <li class="link">
                                                <a href="components/MasterPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MasterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlaceholderPageModule.html" data-type="entity-link">PlaceholderPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PlaceholderPageModule-984a9afa0e2a8faacb712aa93eb6df9b"' : 'data-target="#xs-components-links-module-PlaceholderPageModule-984a9afa0e2a8faacb712aa93eb6df9b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlaceholderPageModule-984a9afa0e2a8faacb712aa93eb6df9b"' :
                                            'id="xs-components-links-module-PlaceholderPageModule-984a9afa0e2a8faacb712aa93eb6df9b"' }>
                                            <li class="link">
                                                <a href="components/PlaceholderPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlaceholderPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link">RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegisterPageModule-887e8368b1615913d0fe7ba97c8ea475"' : 'data-target="#xs-components-links-module-RegisterPageModule-887e8368b1615913d0fe7ba97c8ea475"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-887e8368b1615913d0fe7ba97c8ea475"' :
                                            'id="xs-components-links-module-RegisterPageModule-887e8368b1615913d0fe7ba97c8ea475"' }>
                                            <li class="link">
                                                <a href="components/RegisterPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserGroupPageModule.html" data-type="entity-link">UserGroupPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserGroupPageModule-89277a64dc88c11d0a296796b0bb162b"' : 'data-target="#xs-components-links-module-UserGroupPageModule-89277a64dc88c11d0a296796b0bb162b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserGroupPageModule-89277a64dc88c11d0a296796b0bb162b"' :
                                            'id="xs-components-links-module-UserGroupPageModule-89277a64dc88c11d0a296796b0bb162b"' }>
                                            <li class="link">
                                                <a href="components/UserGroupPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserGroupPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserGroupSplitPageModule.html" data-type="entity-link">UserGroupSplitPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserGroupSplitPageModule-a2211ae2f131d1d2fd52a7c3313ada7a"' : 'data-target="#xs-components-links-module-UserGroupSplitPageModule-a2211ae2f131d1d2fd52a7c3313ada7a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserGroupSplitPageModule-a2211ae2f131d1d2fd52a7c3313ada7a"' :
                                            'id="xs-components-links-module-UserGroupSplitPageModule-a2211ae2f131d1d2fd52a7c3313ada7a"' }>
                                            <li class="link">
                                                <a href="components/UserGroupSplitPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserGroupSplitPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/FeedPage.html" data-type="entity-link">FeedPage</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/_DetailPage.html" data-type="entity-link">_DetailPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/_FeedPage.html" data-type="entity-link">_FeedPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/_MasterPage.html" data-type="entity-link">_MasterPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/_UserGroupObjectPage.html" data-type="entity-link">_UserGroupObjectPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/_UserGroupPage.html" data-type="entity-link">_UserGroupPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Benutzer.html" data-type="entity-link">Benutzer</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthProvider.html" data-type="entity-link">AuthProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpAngularProvider.html" data-type="entity-link">HttpAngularProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpNativeProvider.html" data-type="entity-link">HttpNativeProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpProvider.html" data-type="entity-link">HttpProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavProxyService.html" data-type="entity-link">NavProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavProxyUserGroupService.html" data-type="entity-link">NavProxyUserGroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestProvider.html" data-type="entity-link">RestProvider</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});