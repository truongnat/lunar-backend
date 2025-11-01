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
                    <a href="index.html" data-type="index-link">lunar-calendar documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppCacheModule.html" data-type="entity-link" >AppCacheModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-3fcf86bb20f99798c6751e3061b5bd3e31da8a1bd7548dc2903387321d7f4121366ab6783515280a7306475624b6e03a7d936393a5402a653e678b40931f1615"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-3fcf86bb20f99798c6751e3061b5bd3e31da8a1bd7548dc2903387321d7f4121366ab6783515280a7306475624b6e03a7d936393a5402a653e678b40931f1615"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3fcf86bb20f99798c6751e3061b5bd3e31da8a1bd7548dc2903387321d7f4121366ab6783515280a7306475624b6e03a7d936393a5402a653e678b40931f1615"' :
                                            'id="xs-controllers-links-module-AuthModule-3fcf86bb20f99798c6751e3061b5bd3e31da8a1bd7548dc2903387321d7f4121366ab6783515280a7306475624b6e03a7d936393a5402a653e678b40931f1615"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-3fcf86bb20f99798c6751e3061b5bd3e31da8a1bd7548dc2903387321d7f4121366ab6783515280a7306475624b6e03a7d936393a5402a653e678b40931f1615"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-3fcf86bb20f99798c6751e3061b5bd3e31da8a1bd7548dc2903387321d7f4121366ab6783515280a7306475624b6e03a7d936393a5402a653e678b40931f1615"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3fcf86bb20f99798c6751e3061b5bd3e31da8a1bd7548dc2903387321d7f4121366ab6783515280a7306475624b6e03a7d936393a5402a653e678b40931f1615"' :
                                        'id="xs-injectables-links-module-AuthModule-3fcf86bb20f99798c6751e3061b5bd3e31da8a1bd7548dc2903387321d7f4121366ab6783515280a7306475624b6e03a7d936393a5402a653e678b40931f1615"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PhoneStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhoneStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DrizzleModule.html" data-type="entity-link" >DrizzleModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DrizzleModule-d069909c6896411989905f89585135013a7dc6ef18cf86afe567560368e33cf71fa259bd16e7c174fdd0aafb205cf7852db1eb1695fc80b6dd11dcabeec6d123"' : 'data-bs-target="#xs-injectables-links-module-DrizzleModule-d069909c6896411989905f89585135013a7dc6ef18cf86afe567560368e33cf71fa259bd16e7c174fdd0aafb205cf7852db1eb1695fc80b6dd11dcabeec6d123"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DrizzleModule-d069909c6896411989905f89585135013a7dc6ef18cf86afe567560368e33cf71fa259bd16e7c174fdd0aafb205cf7852db1eb1695fc80b6dd11dcabeec6d123"' :
                                        'id="xs-injectables-links-module-DrizzleModule-d069909c6896411989905f89585135013a7dc6ef18cf86afe567560368e33cf71fa259bd16e7c174fdd0aafb205cf7852db1eb1695fc80b6dd11dcabeec6d123"' }>
                                        <li class="link">
                                            <a href="injectables/DrizzleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DrizzleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-c34b5585f5fb2af3342b6362226c18df9627d16f09d3ff0a5c532150c14a1a0248e56f3237a59495ecfb84924e898b04b2a12cee5da71a66bb45646c30e31920"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-c34b5585f5fb2af3342b6362226c18df9627d16f09d3ff0a5c532150c14a1a0248e56f3237a59495ecfb84924e898b04b2a12cee5da71a66bb45646c30e31920"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-c34b5585f5fb2af3342b6362226c18df9627d16f09d3ff0a5c532150c14a1a0248e56f3237a59495ecfb84924e898b04b2a12cee5da71a66bb45646c30e31920"' :
                                            'id="xs-controllers-links-module-HealthModule-c34b5585f5fb2af3342b6362226c18df9627d16f09d3ff0a5c532150c14a1a0248e56f3237a59495ecfb84924e898b04b2a12cee5da71a66bb45646c30e31920"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HealthModule-c34b5585f5fb2af3342b6362226c18df9627d16f09d3ff0a5c532150c14a1a0248e56f3237a59495ecfb84924e898b04b2a12cee5da71a66bb45646c30e31920"' : 'data-bs-target="#xs-injectables-links-module-HealthModule-c34b5585f5fb2af3342b6362226c18df9627d16f09d3ff0a5c532150c14a1a0248e56f3237a59495ecfb84924e898b04b2a12cee5da71a66bb45646c30e31920"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HealthModule-c34b5585f5fb2af3342b6362226c18df9627d16f09d3ff0a5c532150c14a1a0248e56f3237a59495ecfb84924e898b04b2a12cee5da71a66bb45646c30e31920"' :
                                        'id="xs-injectables-links-module-HealthModule-c34b5585f5fb2af3342b6362226c18df9627d16f09d3ff0a5c532150c14a1a0248e56f3237a59495ecfb84924e898b04b2a12cee5da71a66bb45646c30e31920"' }>
                                        <li class="link">
                                            <a href="injectables/HealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LunarModule.html" data-type="entity-link" >LunarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LunarModule-16b9c59670c6ee4d9f71afddb6d052f658c345bdae4111da27875cd75b221489e550b80a8cc510c480a511850bfcc82a89636d9ea47ed6746f89e0c0e4e9b928"' : 'data-bs-target="#xs-controllers-links-module-LunarModule-16b9c59670c6ee4d9f71afddb6d052f658c345bdae4111da27875cd75b221489e550b80a8cc510c480a511850bfcc82a89636d9ea47ed6746f89e0c0e4e9b928"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LunarModule-16b9c59670c6ee4d9f71afddb6d052f658c345bdae4111da27875cd75b221489e550b80a8cc510c480a511850bfcc82a89636d9ea47ed6746f89e0c0e4e9b928"' :
                                            'id="xs-controllers-links-module-LunarModule-16b9c59670c6ee4d9f71afddb6d052f658c345bdae4111da27875cd75b221489e550b80a8cc510c480a511850bfcc82a89636d9ea47ed6746f89e0c0e4e9b928"' }>
                                            <li class="link">
                                                <a href="controllers/LunarController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LunarController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/LunarEventsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LunarEventsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LunarModule-16b9c59670c6ee4d9f71afddb6d052f658c345bdae4111da27875cd75b221489e550b80a8cc510c480a511850bfcc82a89636d9ea47ed6746f89e0c0e4e9b928"' : 'data-bs-target="#xs-injectables-links-module-LunarModule-16b9c59670c6ee4d9f71afddb6d052f658c345bdae4111da27875cd75b221489e550b80a8cc510c480a511850bfcc82a89636d9ea47ed6746f89e0c0e4e9b928"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LunarModule-16b9c59670c6ee4d9f71afddb6d052f658c345bdae4111da27875cd75b221489e550b80a8cc510c480a511850bfcc82a89636d9ea47ed6746f89e0c0e4e9b928"' :
                                        'id="xs-injectables-links-module-LunarModule-16b9c59670c6ee4d9f71afddb6d052f658c345bdae4111da27875cd75b221489e550b80a8cc510c480a511850bfcc82a89636d9ea47ed6746f89e0c0e4e9b928"' }>
                                        <li class="link">
                                            <a href="injectables/LunarEventsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LunarEventsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LunarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LunarService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MediaModule.html" data-type="entity-link" >MediaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MediaModule-425901f2b7d956ae30faee8894eb57180422d5dd6f8dfbd5029df383e1ed98d252ac95ed41dd4312254d9f77094a89b665d9414b3483566d5d845a93f2eb1f6d"' : 'data-bs-target="#xs-controllers-links-module-MediaModule-425901f2b7d956ae30faee8894eb57180422d5dd6f8dfbd5029df383e1ed98d252ac95ed41dd4312254d9f77094a89b665d9414b3483566d5d845a93f2eb1f6d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MediaModule-425901f2b7d956ae30faee8894eb57180422d5dd6f8dfbd5029df383e1ed98d252ac95ed41dd4312254d9f77094a89b665d9414b3483566d5d845a93f2eb1f6d"' :
                                            'id="xs-controllers-links-module-MediaModule-425901f2b7d956ae30faee8894eb57180422d5dd6f8dfbd5029df383e1ed98d252ac95ed41dd4312254d9f77094a89b665d9414b3483566d5d845a93f2eb1f6d"' }>
                                            <li class="link">
                                                <a href="controllers/MediaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MediaModule-425901f2b7d956ae30faee8894eb57180422d5dd6f8dfbd5029df383e1ed98d252ac95ed41dd4312254d9f77094a89b665d9414b3483566d5d845a93f2eb1f6d"' : 'data-bs-target="#xs-injectables-links-module-MediaModule-425901f2b7d956ae30faee8894eb57180422d5dd6f8dfbd5029df383e1ed98d252ac95ed41dd4312254d9f77094a89b665d9414b3483566d5d845a93f2eb1f6d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MediaModule-425901f2b7d956ae30faee8894eb57180422d5dd6f8dfbd5029df383e1ed98d252ac95ed41dd4312254d9f77094a89b665d9414b3483566d5d845a93f2eb1f6d"' :
                                        'id="xs-injectables-links-module-MediaModule-425901f2b7d956ae30faee8894eb57180422d5dd6f8dfbd5029df383e1ed98d252ac95ed41dd4312254d9f77094a89b665d9414b3483566d5d845a93f2eb1f6d"' }>
                                        <li class="link">
                                            <a href="injectables/MediaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SecurityModule.html" data-type="entity-link" >SecurityModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SecurityModule-576009805c5d30bc7974a44348e9fd969b6eebcafd23afac45081c48714eddcd9a8dcf66062b835788a9d1abd49382ed3bb26a708e990048ce3b8b57418e7758"' : 'data-bs-target="#xs-injectables-links-module-SecurityModule-576009805c5d30bc7974a44348e9fd969b6eebcafd23afac45081c48714eddcd9a8dcf66062b835788a9d1abd49382ed3bb26a708e990048ce3b8b57418e7758"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SecurityModule-576009805c5d30bc7974a44348e9fd969b6eebcafd23afac45081c48714eddcd9a8dcf66062b835788a9d1abd49382ed3bb26a708e990048ce3b8b57418e7758"' :
                                        'id="xs-injectables-links-module-SecurityModule-576009805c5d30bc7974a44348e9fd969b6eebcafd23afac45081c48714eddcd9a8dcf66062b835788a9d1abd49382ed3bb26a708e990048ce3b8b57418e7758"' }>
                                        <li class="link">
                                            <a href="injectables/CsrfMiddleware.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CsrfMiddleware</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LunarController.html" data-type="entity-link" >LunarController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LunarEventsController.html" data-type="entity-link" >LunarEventsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MediaController.html" data-type="entity-link" >MediaController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateEventDto.html" data-type="entity-link" >CreateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMediaDto.html" data-type="entity-link" >CreateMediaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEventsDto.html" data-type="entity-link" >GetEventsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetMediaDto.html" data-type="entity-link" >GetMediaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDto.html" data-type="entity-link" >LoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogQueryDto.html" data-type="entity-link" >LogQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LunarToSolarDto.html" data-type="entity-link" >LunarToSolarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SolarToLunarDto.html" data-type="entity-link" >SolarToLunarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEventDto.html" data-type="entity-link" >UpdateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMediaDto.html" data-type="entity-link" >UpdateMediaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfileDto.html" data-type="entity-link" >UserProfileDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CsrfMiddleware.html" data-type="entity-link" >CsrfMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DrizzleService.html" data-type="entity-link" >DrizzleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link" >GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link" >GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthService.html" data-type="entity-link" >HealthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpCacheInterceptor.html" data-type="entity-link" >HttpCacheInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LunarEventsService.html" data-type="entity-link" >LunarEventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LunarService.html" data-type="entity-link" >LunarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MediaService.html" data-type="entity-link" >MediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PhoneAuthGuard.html" data-type="entity-link" >PhoneAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PhoneStrategy.html" data-type="entity-link" >PhoneStrategy</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DatabaseInfoResponse.html" data-type="entity-link" >DatabaseInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthResponse.html" data-type="entity-link" >HealthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogInfoResponse.html" data-type="entity-link" >LogInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LunarDate.html" data-type="entity-link" >LunarDate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutputOptions.html" data-type="entity-link" >OutputOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SystemInfoResponse.html" data-type="entity-link" >SystemInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VersionInfoResponse.html" data-type="entity-link" >VersionInfoResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});