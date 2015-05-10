/* jshint ignore:start */

/* jshint ignore:end */

define('emberconf-chat/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'emberconf-chat/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('emberconf-chat/controllers/chatroom', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({

    author: null,
    body: null,

    submissionIsValid: Ember['default'].computed.and("author", "body"),
    submissionIsInvalid: Ember['default'].computed.not("submissionIsValid"),

    messageCount: (function () {
      return this.get("content").length;
    }).property("content.[]"),

    actions: {

      submitMessage: function () {
        var message = this.getProperties("author", "body");
        this.get("content").pushObject(message);
        this.set("body", null);
      }

    }

  });

});
define('emberconf-chat/initializers/app-version', ['exports', 'emberconf-chat/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: "App Version",
    initialize: function (container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('emberconf-chat/initializers/export-application-global', ['exports', 'ember', 'emberconf-chat/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('emberconf-chat/router', ['exports', 'ember', 'emberconf-chat/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("chatroom", { path: "/" });
  });

  exports['default'] = Router;

});
define('emberconf-chat/routes/chatroom', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return [];
    }
  });

});
define('emberconf-chat/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createElement("div");
        dom.setAttribute(el0,"class","container");
        var el1 = dom.createTextNode("\n\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("header");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2,"src","/emberconf-logo.png");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,2,3);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('emberconf-chat/templates/chatroom', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","message");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","author");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","content");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),-1,-1);
          var morph1 = dom.createMorphAt(dom.childAt(element0, [3]),-1,-1);
          content(env, morph0, context, "message.author");
          content(env, morph1, context, "message.body");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"class","messages");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","message-count");
        var el3 = dom.createTextNode("\n    Message Count: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","message-input");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","message-author");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode("Your Name");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","message-body");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode("Message");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","message-submit");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("input");
        dom.setAttribute(el3,"type","submit");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content, inline = hooks.inline, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(fragment, [2]);
        var element3 = dom.childAt(element2, [5, 1]);
        var morph0 = dom.createMorphAt(element1,0,1);
        var morph1 = dom.createMorphAt(dom.childAt(element1, [2]),0,1);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [1]),2,3);
        var morph3 = dom.createMorphAt(dom.childAt(element2, [3]),2,3);
        block(env, morph0, context, "each", [get(env, context, "content")], {"keyword": "message"}, child0, null);
        content(env, morph1, context, "messageCount");
        inline(env, morph2, context, "input", [], {"type": "text", "value": get(env, context, "author")});
        inline(env, morph3, context, "input", [], {"type": "text", "value": get(env, context, "body")});
        element(env, element3, context, "bind-attr", [], {"disabled": get(env, context, "submissionIsInvalid")});
        element(env, element3, context, "action", ["submitMessage"], {});
        return fragment;
      }
    };
  }()));

});
define('emberconf-chat/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('emberconf-chat/tests/controllers/chatroom.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/chatroom.js should pass jshint', function() { 
    ok(true, 'controllers/chatroom.js should pass jshint.'); 
  });

});
define('emberconf-chat/tests/helpers/resolver', ['exports', 'ember/resolver', 'emberconf-chat/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('emberconf-chat/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('emberconf-chat/tests/helpers/start-app', ['exports', 'ember', 'emberconf-chat/app', 'emberconf-chat/router', 'emberconf-chat/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('emberconf-chat/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('emberconf-chat/tests/integration/disable-and-enable-submit-button-test', ['ember', 'ember-qunit', 'qunit', 'emberconf-chat/tests/helpers/start-app'], function (Ember, ember_qunit, qunit, startApp) {

  'use strict';

  var App;

  qunit.module("Integration - Enable and Disable Submit Button", {
    beforeEach: function () {
      App = startApp['default']();
    },
    afterEach: function () {
      Ember['default'].run(App, App.destroy);
    }
  });

  ember_qunit.test("it has a submit button", function (assert) {
    assert.expect(1);
    visit("/").then(function () {
      assert.ok(find("input[type=submit]").length, "It has a submit button");
    });
  });

  ember_qunit.test("the submit button is disabled by default", function (assert) {
    assert.expect(1);
    visit("/").then(function () {
      andThen(function () {
        assert.ok($("input[type=submit]").prop("disabled"), "The submit button is disabled.");
      });
    });
  });

  ember_qunit.test("entering an author name and method activates the button", function (assert) {
    assert.expect(1);
    visit("/").then(function () {
      fillIn(".message-author input[type=text]", "Author");
      fillIn(".message-body input[type=text]", "Body");
      andThen(function () {
        assert.ok(!find("input[type=submit]").prop("disabled"), "The submit button is enabled.");
      });
    });
  });

});
define('emberconf-chat/tests/integration/disable-and-enable-submit-button-test.jshint', function () {

  'use strict';

  module('JSHint - integration');
  test('integration/disable-and-enable-submit-button-test.js should pass jshint', function() { 
    ok(true, 'integration/disable-and-enable-submit-button-test.js should pass jshint.'); 
  });

});
define('emberconf-chat/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('emberconf-chat/tests/routes/chatroom.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/chatroom.js should pass jshint', function() { 
    ok(true, 'routes/chatroom.js should pass jshint.'); 
  });

});
define('emberconf-chat/tests/test-helper', ['emberconf-chat/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('emberconf-chat/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('emberconf-chat/tests/unit/controllers/chatroom-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:chatroom", {});

  // Replace this with your real tests.
  ember_qunit.test("submission is invalid if author or body is missing", function (assert) {
    var controller = this.subject();
    controller.setProperties({
      author: null,
      body: null
    });
    assert.ok(controller.get("submissionIsInvalid"));
  });

  ember_qunit.test("submission is valid if author or body is missing", function (assert) {
    var controller = this.subject();
    controller.setProperties({
      author: "Author",
      body: "Body"
    });
    assert.ok(controller.get("submissionIsValid"));
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('emberconf-chat/tests/unit/controllers/chatroom-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/chatroom-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/chatroom-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('emberconf-chat/config/environment', ['ember'], function(Ember) {
  var prefix = 'emberconf-chat';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("emberconf-chat/tests/test-helper");
} else {
  require("emberconf-chat/app")["default"].create({"name":"emberconf-chat","version":"0.0.0.55fbfa05"});
}

/* jshint ignore:end */
//# sourceMappingURL=emberconf-chat.map