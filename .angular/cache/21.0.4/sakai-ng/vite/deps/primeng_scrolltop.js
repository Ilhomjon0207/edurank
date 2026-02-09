import {
  Button
} from "./chunk-DUBDXKBO.js";
import "./chunk-YVXD7XXE.js";
import "./chunk-JU4YMRDL.js";
import "./chunk-INGZTHJO.js";
import "./chunk-BXYT5AJA.js";
import {
  MotionDirective
} from "./chunk-2DDGVDQM.js";
import {
  zindexutils
} from "./chunk-WWLRKEVG.js";
import "./chunk-D7ACGRZU.js";
import {
  ChevronUpIcon
} from "./chunk-AQJ7JDVU.js";
import "./chunk-J4DSKYTF.js";
import {
  BaseComponent,
  PARENT_INSTANCE
} from "./chunk-XQUBZKJ3.js";
import {
  BaseStyle
} from "./chunk-CYI6Z2XQ.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-7QUM6YB3.js";
import {
  Bind
} from "./chunk-67CI5Q7F.js";
import "./chunk-EOG5TL4Y.js";
import {
  $
} from "./chunk-5QCRAMDB.js";
import {
  CommonModule,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-TSVYQC3Y.js";
import "./chunk-2GUP4FMW.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  ViewEncapsulation,
  computed,
  inject,
  input,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor
} from "./chunk-JLR7FQ3G.js";
import "./chunk-HWYXSU2G.js";
import "./chunk-JRFR6BLO.js";
import "./chunk-MARUHEWW.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/scrolltop/index.mjs
var style = "\n    .p-scrolltop.p-button {\n        position: fixed !important;\n        inset-block-end: 20px;\n        inset-inline-end: 20px;\n    }\n\n    .p-scrolltop-sticky.p-button {\n        position: sticky !important;\n        display: flex;\n        margin-inline-start: auto;\n    }\n\n    .p-scrolltop-enter-from {\n        opacity: 0;\n    }\n\n    .p-scrolltop-enter-active {\n        transition: opacity 300ms;\n    }\n\n    .p-scrolltop-leave-to {\n        opacity: 0;\n    }\n\n    .p-scrolltop-leave-active {\n        transition: opacity 300ms;\n    }\n";

// node_modules/primeng/fesm2022/primeng-scrolltop.mjs
var _c0 = ["icon"];
var _c1 = (a0) => ({
  styleClass: a0
});
function ScrollTop_Conditional_0_ng_template_1_ng_container_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("icon"), ctx_r1._icon));
  }
}
function ScrollTop_Conditional_0_ng_template_1_ng_container_0__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 7);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r1.cx("icon"));
  }
}
function ScrollTop_Conditional_0_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, ScrollTop_Conditional_0_ng_template_1_ng_container_0_span_1_Template, 1, 2, "span", 5)(2, ScrollTop_Conditional_0_ng_template_1_ng_container_0__svg_svg_2_Template, 1, 2, "svg", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1._icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1._icon);
  }
}
function ScrollTop_Conditional_0_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function ScrollTop_Conditional_0_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ScrollTop_Conditional_0_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template", 8);
  }
  if (rf & 2) {
    ɵɵnextContext(2);
    const icon_r3 = ɵɵreference(2);
    ɵɵproperty("ngIf", !icon_r3);
  }
}
function ScrollTop_Conditional_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ScrollTop_Conditional_0_ng_template_1_ng_container_0_Template, 3, 2, "ng-container", 3)(1, ScrollTop_Conditional_0_ng_template_1_1_Template, 1, 1, null, 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", !ctx_r1.iconTemplate && !ctx_r1._iconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.iconTemplate || ctx_r1._iconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(3, _c1, ctx_r1.cx("icon")));
  }
}
function ScrollTop_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 2);
    ɵɵlistener("pMotionOnBeforeEnter", function ScrollTop_Conditional_0_Template_p_button_pMotionOnBeforeEnter_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onBeforeEnter($event));
    })("pMotionOnBeforeLeave", function ScrollTop_Conditional_0_Template_p_button_pMotionOnBeforeLeave_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onBeforeLeave());
    })("pMotionOnAfterLeave", function ScrollTop_Conditional_0_Template_p_button_pMotionOnAfterLeave_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAfterLeave());
    })("click", function ScrollTop_Conditional_0_Template_p_button_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onClick());
    });
    ɵɵtemplate(1, ScrollTop_Conditional_0_ng_template_1_Template, 2, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("pMotion", ctx_r1.visible())("pMotionAppear", true)("pMotionName", "p-scrolltop")("pMotionOptions", ctx_r1.computedMotionOptions())("pt", ctx_r1.ptm("pcButton"))("styleClass", ctx_r1.cn(ctx_r1.cx("root"), ctx_r1.styleClass))("ngStyle", ctx_r1.style)("buttonProps", ctx_r1.buttonProps)("unstyled", ctx_r1.unstyled());
    ɵɵattribute("aria-label", ctx_r1.buttonAriaLabel);
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-scrolltop", {
    "p-scrolltop-sticky": instance.target !== "window"
  }],
  icon: "p-scrolltop-icon"
};
var ScrollTopStyle = class _ScrollTopStyle extends BaseStyle {
  name = "scrolltop";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵScrollTopStyle_BaseFactory;
    return function ScrollTopStyle_Factory(__ngFactoryType__) {
      return (ɵScrollTopStyle_BaseFactory || (ɵScrollTopStyle_BaseFactory = ɵɵgetInheritedFactory(_ScrollTopStyle)))(__ngFactoryType__ || _ScrollTopStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _ScrollTopStyle,
    factory: _ScrollTopStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollTopStyle, [{
    type: Injectable
  }], null, null);
})();
var ScrollTopClasses;
(function(ScrollTopClasses2) {
  ScrollTopClasses2["root"] = "p-scrolltop";
  ScrollTopClasses2["icon"] = "p-scrolltop-icon";
})(ScrollTopClasses || (ScrollTopClasses = {}));
var SCROLLTOP_INSTANCE = new InjectionToken("SCROLLTOP_INSTANCE");
var ScrollTop = class _ScrollTop extends BaseComponent {
  $pcScrollTop = inject(SCROLLTOP_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Class of the element.
   * @group Props
   */
  styleClass;
  /**
   * Inline style of the element.
   * @group Props
   */
  style;
  /**
   * Target of the ScrollTop.
   * @group Props
   */
  target = "window";
  /**
   * Defines the threshold value of the vertical scroll position of the target to toggle the visibility.
   * @group Props
   */
  threshold = 400;
  /**
   * Name of the icon or JSX.Element for icon.
   * @group Props
   */
  get icon() {
    return this._icon;
  }
  /**
   * Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump.
   * @group Props
   */
  behavior = "smooth";
  /**
   * A string value used to determine the display transition options.
   * @group Props
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   */
  showTransitionOptions = ".15s";
  /**
   * A string value used to determine the hiding transition options.
   * @group Props
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   */
  hideTransitionOptions = ".15s";
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(void 0, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  computedMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("motion")), this.motionOptions());
  }, ...ngDevMode ? [{
    debugName: "computedMotionOptions"
  }] : []);
  /**
   * Establishes a string value that labels the scroll-top button.
   * @group Props
   */
  buttonAriaLabel;
  /**
   * Used to pass all properties of the ButtonProps to the Button component.
   * @group Props
   */
  buttonProps = {
    rounded: true
  };
  /**
   * Custom icon template.
   * @param {ScrollTopIconTemplateContext} context - icon context.
   * @see {@link ScrollTopIconTemplateContext}
   * @group Templates
   */
  iconTemplate;
  templates;
  _iconTemplate;
  _icon;
  set icon(value) {
    this._icon = value;
  }
  documentScrollListener;
  parentScrollListener;
  visible = signal(false, ...ngDevMode ? [{
    debugName: "visible"
  }] : []);
  render = signal(false, ...ngDevMode ? [{
    debugName: "render"
  }] : []);
  overlay;
  _componentStyle = inject(ScrollTopStyle);
  onInit() {
    if (this.target === "window") this.bindDocumentScrollListener();
    else if (this.target === "parent") this.bindParentScrollListener();
  }
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "icon":
          this._iconTemplate = item.template;
          break;
      }
    });
  }
  onClick() {
    let scrollElement = this.target === "window" ? this.document.defaultView : this.el.nativeElement.parentElement;
    scrollElement.scroll({
      top: 0,
      behavior: this.behavior
    });
  }
  onBeforeEnter(event) {
    this.overlay = event.element;
    this.overlay.style.position = this.target === "parent" ? "sticky" : "fixed";
    zindexutils.set("overlay", this.overlay, this.config.zIndex.overlay);
  }
  onBeforeLeave() {
    zindexutils.clear(this.overlay);
    this.overlay = null;
  }
  onAfterLeave() {
    this.render.set(false);
  }
  checkVisibility(scrollY) {
    if (scrollY > this.threshold) {
      this.visible.set(true);
      if (!this.render()) {
        this.render.set(true);
      }
    } else {
      this.visible.set(false);
    }
  }
  bindParentScrollListener() {
    if (isPlatformBrowser(this.platformId)) {
      this.parentScrollListener = this.renderer.listen(this.el.nativeElement.parentElement, "scroll", () => {
        this.checkVisibility(this.el.nativeElement.parentElement.scrollTop);
      });
    }
  }
  bindDocumentScrollListener() {
    if (isPlatformBrowser(this.platformId)) {
      this.documentScrollListener = this.renderer.listen(this.document.defaultView, "scroll", () => {
        this.checkVisibility($());
      });
    }
  }
  unbindParentScrollListener() {
    if (this.parentScrollListener) {
      this.parentScrollListener();
      this.parentScrollListener = null;
    }
  }
  unbindDocumentScrollListener() {
    if (this.documentScrollListener) {
      this.documentScrollListener();
      this.documentScrollListener = null;
    }
  }
  onDestroy() {
    if (this.target === "window") this.unbindDocumentScrollListener();
    else if (this.target === "parent") this.unbindParentScrollListener();
    if (this.overlay) {
      zindexutils.clear(this.overlay);
      this.overlay = null;
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵScrollTop_BaseFactory;
    return function ScrollTop_Factory(__ngFactoryType__) {
      return (ɵScrollTop_BaseFactory || (ɵScrollTop_BaseFactory = ɵɵgetInheritedFactory(_ScrollTop)))(__ngFactoryType__ || _ScrollTop);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _ScrollTop,
    selectors: [["p-scrollTop"], ["p-scrolltop"], ["p-scroll-top"]],
    contentQueries: function ScrollTop_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.iconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    inputs: {
      styleClass: "styleClass",
      style: "style",
      target: "target",
      threshold: [2, "threshold", "threshold", numberAttribute],
      icon: "icon",
      behavior: "behavior",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      motionOptions: [1, "motionOptions"],
      buttonAriaLabel: "buttonAriaLabel",
      buttonProps: "buttonProps"
    },
    features: [ɵɵProvidersFeature([ScrollTopStyle, {
      provide: SCROLLTOP_INSTANCE,
      useExisting: _ScrollTop
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _ScrollTop
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 1,
    vars: 1,
    consts: [["icon", ""], ["type", "button", 3, "pMotion", "pMotionAppear", "pMotionName", "pMotionOptions", "pt", "styleClass", "ngStyle", "buttonProps", "unstyled"], ["type", "button", 3, "pMotionOnBeforeEnter", "pMotionOnBeforeLeave", "pMotionOnAfterLeave", "click", "pMotion", "pMotionAppear", "pMotionName", "pMotionOptions", "pt", "styleClass", "ngStyle", "buttonProps", "unstyled"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "class", 4, "ngIf"], ["data-p-icon", "chevron-up", 3, "class", 4, "ngIf"], ["data-p-icon", "chevron-up"], [3, "ngIf"]],
    template: function ScrollTop_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, ScrollTop_Conditional_0_Template, 3, 10, "p-button", 1);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.render() ? 0 : -1);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, ChevronUpIcon, Button, SharedModule, MotionDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollTop, [{
    type: Component,
    args: [{
      selector: "p-scrollTop, p-scrolltop, p-scroll-top",
      standalone: true,
      imports: [CommonModule, ChevronUpIcon, Button, SharedModule, MotionDirective],
      template: `
        @if (render()) {
            <p-button
                [pMotion]="visible()"
                [pMotionAppear]="true"
                [pMotionName]="'p-scrolltop'"
                [pMotionOptions]="computedMotionOptions()"
                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                (pMotionOnBeforeLeave)="onBeforeLeave()"
                (pMotionOnAfterLeave)="onAfterLeave()"
                [attr.aria-label]="buttonAriaLabel"
                (click)="onClick()"
                [pt]="ptm('pcButton')"
                [styleClass]="cn(cx('root'), styleClass)"
                [ngStyle]="style"
                type="button"
                [buttonProps]="buttonProps"
                [unstyled]="unstyled()"
            >
                <ng-template #icon>
                    <ng-container *ngIf="!iconTemplate && !_iconTemplate">
                        <span *ngIf="_icon" [class]="cn(cx('icon'), _icon)"></span>
                        <svg data-p-icon="chevron-up" *ngIf="!_icon" [class]="cx('icon')" />
                    </ng-container>
                    <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate || _iconTemplate; context: { styleClass: cx('icon') }"></ng-template>
                </ng-template>
            </p-button>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [ScrollTopStyle, {
        provide: SCROLLTOP_INSTANCE,
        useExisting: ScrollTop
      }, {
        provide: PARENT_INSTANCE,
        useExisting: ScrollTop
      }],
      hostDirectives: [Bind]
    }]
  }], null, {
    styleClass: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    target: [{
      type: Input
    }],
    threshold: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    icon: [{
      type: Input
    }],
    behavior: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    buttonAriaLabel: [{
      type: Input
    }],
    buttonProps: [{
      type: Input
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var ScrollTopModule = class _ScrollTopModule {
  static ɵfac = function ScrollTopModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollTopModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ScrollTopModule,
    imports: [ScrollTop, SharedModule],
    exports: [ScrollTop, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [ScrollTop, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollTopModule, [{
    type: NgModule,
    args: [{
      imports: [ScrollTop, SharedModule],
      exports: [ScrollTop, SharedModule]
    }]
  }], null, null);
})();
export {
  ScrollTop,
  ScrollTopClasses,
  ScrollTopModule,
  ScrollTopStyle
};
//# sourceMappingURL=primeng_scrolltop.js.map
