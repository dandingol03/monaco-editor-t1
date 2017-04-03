webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/danding/Documents/WebstormProj/monaco-editor-t1/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/danding/Documents/WebstormProj/monaco-editor-t1/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(53);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(57);
	
	var _reactMonacoEditor = __webpack_require__(167);
	
	var _reactMonacoEditor2 = _interopRequireDefault(_reactMonacoEditor);
	
	// Using with webpack
	
	var CodeEditor = (function (_React$Component) {
	  _inherits(CodeEditor, _React$Component);
	
	  function CodeEditor(props) {
	    _classCallCheck(this, CodeEditor);
	
	    _get(Object.getPrototypeOf(CodeEditor.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      code: '// type your code... \n'
	    };
	  }
	
	  // Using with require.config
	
	  _createClass(CodeEditor, [{
	    key: 'editorDidMount',
	    value: function editorDidMount(editor) {
	      console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
	      this.editor = editor;
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(newValue, e) {
	      console.log('onChange', newValue, e);
	    }
	  }, {
	    key: 'changeEditorValue',
	    value: function changeEditorValue() {
	      if (this.editor) {
	        this.editor.setValue('// code changed! \n');
	      }
	    }
	  }, {
	    key: 'changeBySetState',
	    value: function changeBySetState() {
	      this.setState({ code: '// code changed by setState! \n' });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var code = this.state.code;
	      var options = {
	        selectOnLineNumbers: true,
	        roundedSelection: false,
	        readOnly: false,
	        theme: 'vs',
	        cursorStyle: 'line',
	        automaticLayout: false
	      };
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'div',
	          null,
	          _react2['default'].createElement(
	            'button',
	            { onClick: this.changeEditorValue },
	            'Change value'
	          ),
	          _react2['default'].createElement(
	            'button',
	            { onClick: this.changeBySetState },
	            'Change by setState'
	          )
	        ),
	        _react2['default'].createElement('hr', null),
	        _react2['default'].createElement(_reactMonacoEditor2['default'], {
	          height: '500',
	          language: 'javascript',
	          theme: 'vs-dark',
	          value: code,
	          options: options,
	          onChange: this.onChange,
	          editorDidMount: function (editor) {
	            _this.editorDidMount(editor);
	          }
	        })
	      );
	    }
	  }]);
	
	  return CodeEditor;
	})(_react2['default'].Component);
	
	var AnotherEditor = (function (_React$Component2) {
	  _inherits(AnotherEditor, _React$Component2);
	
	  function AnotherEditor(props) {
	    _classCallCheck(this, AnotherEditor);
	
	    _get(Object.getPrototypeOf(AnotherEditor.prototype), 'constructor', this).call(this, props);
	    var jsonCode = ['{', '    "$schema": "http://myserver/foo-schema.json"', "}"].join('\n');
	    this.state = {
	      code: jsonCode
	    };
	  }
	
	  _createClass(AnotherEditor, [{
	    key: 'editorWillMount',
	    value: function editorWillMount(monaco) {
	      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
	        schemas: [{
	          uri: "http://myserver/foo-schema.json",
	          schema: {
	            type: "object",
	            properties: {
	              p1: {
	                'enum': ["v1", "v2"]
	              },
	              p2: {
	                $ref: "http://myserver/bar-schema.json"
	              }
	            }
	          }
	        }, {
	          uri: "http://myserver/bar-schema.json",
	          schema: {
	            type: "object",
	            properties: {
	              q1: {
	                'enum': ["x1", "x2"]
	              }
	            }
	          }
	        }]
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var code = this.state.code;
	      var requireConfig = {
	        url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
	        paths: {
	          'vs': 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min/vs'
	        }
	      };
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(_reactMonacoEditor2['default'], {
	          width: '800',
	          height: '600',
	          language: 'json',
	          defaultValue: code,
	          requireConfig: requireConfig,
	          editorWillMount: this.editorWillMount
	        })
	      );
	    }
	  }]);
	
	  return AnotherEditor;
	})(_react2['default'].Component);
	
	var App = (function (_React$Component3) {
	  _inherits(App, _React$Component3);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'h2',
	          null,
	          'Monaco Editor Sample (controlled mode)'
	        ),
	        _react2['default'].createElement(CodeEditor, null),
	        _react2['default'].createElement('hr', null),
	        _react2['default'].createElement(
	          'h2',
	          null,
	          'Another editor (uncontrolled mode)'
	        ),
	        _react2['default'].createElement(AnotherEditor, null)
	      );
	    }
	  }]);
	
	  return App;
	})(_react2['default'].Component);
	
	(0, _reactDom.render)(_react2['default'].createElement(App, null), document.getElementById('root'));
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/danding/Documents/WebstormProj/monaco-editor-t1/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/danding/Documents/WebstormProj/monaco-editor-t1/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/danding/Documents/WebstormProj/monaco-editor-t1/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(53);
	
	var _react2 = _interopRequireDefault(_react);
	
	function noop() {}
	
	var MonacoEditor = (function (_React$Component) {
	  _inherits(MonacoEditor, _React$Component);
	
	  function MonacoEditor(props) {
	    _classCallCheck(this, MonacoEditor);
	
	    _get(Object.getPrototypeOf(MonacoEditor.prototype), 'constructor', this).call(this, props);
	    this.__current_value = props.value;
	  }
	
	  _createClass(MonacoEditor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.afterViewInit();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.destroyMonaco();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	
	      var context = this.props.context || window;
	      if (this.props.value !== this.__current_value) {
	        // Always refer to the latest value
	        this.__current_value = this.props.value;
	        // Consider the situation of rendering 1+ times before the editor mounted
	        if (this.editor) {
	          this.__prevent_trigger_change_event = true;
	          this.editor.setValue(this.__current_value);
	          this.__prevent_trigger_change_event = false;
	        }
	      }
	      if (prevProps.language !== this.props.language) {
	        context.monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
	      }
	    }
	  }, {
	    key: 'editorWillMount',
	    value: function editorWillMount(monaco) {
	      var editorWillMount = this.props.editorWillMount;
	
	      editorWillMount(monaco);
	    }
	  }, {
	    key: 'editorDidMount',
	    value: function editorDidMount(editor, monaco) {
	      var _this = this;
	
	      var _props = this.props;
	      var editorDidMount = _props.editorDidMount;
	      var onChange = _props.onChange;
	
	      editorDidMount(editor, monaco);
	      editor.onDidChangeModelContent(function (event) {
	        var value = editor.getValue();
	
	        // Always refer to the latest value
	        _this.__current_value = value;
	
	        // Only invoking when user input changed
	        if (!_this.__prevent_trigger_change_event) {
	          onChange(value, event);
	        }
	      });
	    }
	  }, {
	    key: 'afterViewInit',
	    value: function afterViewInit() {
	      var _this2 = this;
	
	      var requireConfig = this.props.requireConfig;
	
	      var loaderUrl = requireConfig.url || 'vs/loader.js';
	      var context = this.props.context || window;
	      var onGotAmdLoader = function onGotAmdLoader() {
	        if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
	          // Do not use webpack
	          if (requireConfig.paths && requireConfig.paths.vs) {
	            context.require.config(requireConfig);
	          }
	        }
	
	        // Load monaco
	        context.require(['vs/editor/editor.main'], function () {
	          _this2.initMonaco();
	        });
	
	        // Call the delayed callbacks when AMD loader has been loaded
	        if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
	          context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
	          var loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;
	          if (loaderCallbacks && loaderCallbacks.length) {
	            var currentCallback = loaderCallbacks.shift();
	            while (currentCallback) {
	              currentCallback.fn.call(currentCallback.context);
	              currentCallback = loaderCallbacks.shift();
	            }
	          }
	        }
	      };
	
	      // Load AMD loader if necessary
	      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
	        // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
	        //  delay to call callbacks except the first one
	        context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || [];
	        context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
	          context: this,
	          fn: onGotAmdLoader
	        });
	      } else {
	        if (typeof context.require === 'undefined') {
	          var loaderScript = context.document.createElement('script');
	          loaderScript.type = 'text/javascript';
	          loaderScript.src = loaderUrl;
	          loaderScript.addEventListener('load', onGotAmdLoader);
	          context.document.body.appendChild(loaderScript);
	          context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
	        } else {
	          onGotAmdLoader();
	        }
	      }
	    }
	  }, {
	    key: 'initMonaco',
	    value: function initMonaco() {
	      var value = this.props.value !== null ? this.props.value : this.props.defaultValue;
	      var _props2 = this.props;
	      var language = _props2.language;
	      var theme = _props2.theme;
	      var options = _props2.options;
	
	      var containerElement = this.refs.container;
	      var context = this.props.context || window;
	      if (typeof context.monaco !== 'undefined') {
	        // Before initializing monaco editor
	        this.editorWillMount(context.monaco);
	
	        this.editor = context.monaco.editor.create(containerElement, Object.assign({
	          value: value,
	          language: language,
	          theme: theme
	        }, options));
	        // After initializing monaco editor
	        this.editorDidMount(this.editor, context.monaco);
	      }
	    }
	  }, {
	    key: 'destroyMonaco',
	    value: function destroyMonaco() {
	      if (typeof this.editor !== 'undefined') {
	        this.editor.dispose();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props3 = this.props;
	      var width = _props3.width;
	      var height = _props3.height;
	
	      var fixedWidth = width.toString().indexOf('%') !== -1 ? width : width + 'px';
	      var fixedHeight = height.toString().indexOf('%') !== -1 ? height : height + 'px';
	      var style = {
	        width: fixedWidth,
	        height: fixedHeight
	      };
	      return _react2['default'].createElement('div', { ref: 'container', style: style, className: 'react-monaco-editor-container' });
	    }
	  }]);
	
	  return MonacoEditor;
	})(_react2['default'].Component);
	
	MonacoEditor.propTypes = {
	  width: _react.PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	  height: _react.PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	  value: _react.PropTypes.string,
	  defaultValue: _react.PropTypes.string,
	  language: _react.PropTypes.string,
	  theme: _react.PropTypes.string,
	  options: _react.PropTypes.object,
	  editorDidMount: _react.PropTypes.func,
	  editorWillMount: _react.PropTypes.func,
	  onChange: _react.PropTypes.func,
	  requireConfig: _react.PropTypes.object
	};
	
	MonacoEditor.defaultProps = {
	  width: '100%',
	  height: '100%',
	  value: null,
	  defaultValue: '',
	  language: 'javascript',
	  theme: 'vs',
	  options: {},
	  editorDidMount: noop,
	  editorWillMount: noop,
	  onChange: noop,
	  requireConfig: {}
	};
	
	exports['default'] = MonacoEditor;
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/danding/Documents/WebstormProj/monaco-editor-t1/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBQWtCLEVBQU87Ozs7cUNBQ0YsRUFBVzs7OENBQ1QsR0FBcUI7Ozs7OztLQUd4QyxVQUFVO2FBQVYsVUFBVTs7QUFDSCxZQURQLFVBQVUsQ0FDRixLQUFLLEVBQUU7MkJBRGYsVUFBVTs7QUFFWixnQ0FGRSxVQUFVLDZDQUVOLEtBQUssRUFBRTtBQUNiLFNBQUksQ0FBQyxLQUFLLEdBQUc7QUFDWCxXQUFJLEVBQUUseUJBQXlCO01BQ2hDO0lBQ0Y7Ozs7Z0JBTkcsVUFBVTs7WUFPQSx3QkFBQyxNQUFNLEVBQUU7QUFDckIsY0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzVFLFdBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO01BQ3RCOzs7WUFDTyxrQkFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO0FBQ3BCLGNBQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztNQUN0Qzs7O1lBQ2dCLDZCQUFHO0FBQ2xCLFdBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNmLGFBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDN0M7TUFDRjs7O1lBQ2UsNEJBQUc7QUFDakIsV0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxpQ0FBaUMsRUFBQyxDQUFDLENBQUM7TUFDMUQ7OztZQUNLLGtCQUFHOzs7QUFDUCxXQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUM3QixXQUFNLE9BQU8sR0FBRztBQUNkLDRCQUFtQixFQUFFLElBQUk7QUFD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TTtBQUN2QixVQUFPLEVBQUUsaUJBQVUsTUFBTTtBQUN6QixpQkFBYyxFQUFFLGlCQUFVLElBQUk7QUFDOUIsa0JBQWUsRUFBRSxpQkFBVSxJQUFJO0FBQy9CLFdBQVEsRUFBRSxpQkFBVSxJQUFJO0FBQ3hCLGdCQUFhLEVBQUUsaUJBQVUsTUFBTTtFQUNoQyxDQUFDOztBQUVGLGFBQVksQ0FBQyxZQUFZLEdBQUc7QUFDMUIsUUFBSyxFQUFFLE1BQU07QUFDYixTQUFNLEVBQUUsTUFBTTtBQUNkLFFBQUssRUFBRSxJQUFJO0FBQ1gsZUFBWSxFQUFFLEVBQUU7QUFDaEIsV0FBUSxFQUFFLFlBQVk7QUFDdEIsUUFBSyxFQUFFLElBQUk7QUFDWCxVQUFPLEVBQUUsRUFBRTtBQUNYLGlCQUFjLEVBQUUsSUFBSTtBQUNwQixrQkFBZSxFQUFFLElBQUk7QUFDckIsV0FBUSxFQUFFLElBQUk7QUFDZCxnQkFBYSxFQUFFLEVBQUU7RUFDbEIsQ0FBQzs7c0JBRWEsWUFBWSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBNb25hY29FZGl0b3IgZnJvbSAncmVhY3QtbW9uYWNvLWVkaXRvcic7XG5cbi8vIFVzaW5nIHdpdGggd2VicGFja1xuY2xhc3MgQ29kZUVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2RlOiAnLy8gdHlwZSB5b3VyIGNvZGUuLi4gXFxuJyxcbiAgICB9XG4gIH1cbiAgZWRpdG9yRGlkTW91bnQoZWRpdG9yKSB7XG4gICAgY29uc29sZS5sb2coJ2VkaXRvckRpZE1vdW50JywgZWRpdG9yLCBlZGl0b3IuZ2V0VmFsdWUoKSwgZWRpdG9yLmdldE1vZGVsKCkpO1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICB9XG4gIG9uQ2hhbmdlKG5ld1ZhbHVlLCBlKSB7XG4gICAgY29uc29sZS5sb2coJ29uQ2hhbmdlJywgbmV3VmFsdWUsIGUpO1xuICB9XG4gIGNoYW5nZUVkaXRvclZhbHVlKCkge1xuICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUoJy8vIGNvZGUgY2hhbmdlZCEgXFxuJyk7XG4gICAgfVxuICB9XG4gIGNoYW5nZUJ5U2V0U3RhdGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29kZTogJy8vIGNvZGUgY2hhbmdlZCBieSBzZXRTdGF0ZSEgXFxuJ30pO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5zdGF0ZS5jb2RlO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBzZWxlY3RPbkxpbmVOdW1iZXJzOiB0cnVlLFxuICAgICAgcm91bmRlZFNlbGVjdGlvbjogZmFsc2UsXG4gICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICB0aGVtZTogJ3ZzJyxcbiAgICAgIGN1cnNvclN0eWxlOiAnbGluZScsXG4gICAgICBhdXRvbWF0aWNMYXlvdXQ6IGZhbHNlLFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNoYW5nZUVkaXRvclZhbHVlfT5DaGFuZ2UgdmFsdWU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jaGFuZ2VCeVNldFN0YXRlfT5DaGFuZ2UgYnkgc2V0U3RhdGU8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICA8TW9uYWNvRWRpdG9yXG4gICAgICAgICAgICAgIGhlaWdodD1cIjUwMFwiXG4gICAgICAgICAgICAgIGxhbmd1YWdlPVwiamF2YXNjcmlwdFwiXG4gICAgICAgICAgICAgIHRoZW1lPVwidnMtZGFya1wiXG4gICAgICAgICAgICAgIHZhbHVlPXtjb2RlfVxuICAgICAgICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgZWRpdG9yRGlkTW91bnQ9eyhlZGl0b3IpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3JEaWRNb3VudChlZGl0b3IpXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG4vLyBVc2luZyB3aXRoIHJlcXVpcmUuY29uZmlnXG5jbGFzcyBBbm90aGVyRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QganNvbkNvZGUgPSBbXG4gICAgICAneycsXG4gICAgICAnICAgIFwiJHNjaGVtYVwiOiBcImh0dHA6Ly9teXNlcnZlci9mb28tc2NoZW1hLmpzb25cIicsXG4gICAgICBcIn1cIlxuICAgIF0uam9pbignXFxuJyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvZGU6IGpzb25Db2RlLFxuICAgIH1cbiAgfVxuICBlZGl0b3JXaWxsTW91bnQobW9uYWNvKSB7XG4gICAgbW9uYWNvLmxhbmd1YWdlcy5qc29uLmpzb25EZWZhdWx0cy5zZXREaWFnbm9zdGljc09wdGlvbnMoe1xuICAgICAgc2NoZW1hczogW3tcbiAgICAgICAgdXJpOiBcImh0dHA6Ly9teXNlcnZlci9mb28tc2NoZW1hLmpzb25cIixcbiAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBwMToge1xuICAgICAgICAgICAgICBlbnVtOiBbIFwidjFcIiwgXCJ2MlwiXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHAyOiB7XG4gICAgICAgICAgICAgICRyZWY6IFwiaHR0cDovL215c2VydmVyL2Jhci1zY2hlbWEuanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LHtcbiAgICAgICAgdXJpOiBcImh0dHA6Ly9teXNlcnZlci9iYXItc2NoZW1hLmpzb25cIixcbiAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBxMToge1xuICAgICAgICAgICAgICBlbnVtOiBbIFwieDFcIiwgXCJ4MlwiXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfV1cbiAgICB9KTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuc3RhdGUuY29kZTtcbiAgICBjb25zdCByZXF1aXJlQ29uZmlnID0ge1xuICAgICAgdXJsOiAnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvcmVxdWlyZS5qcy8yLjMuMS9yZXF1aXJlLm1pbi5qcycsXG4gICAgICBwYXRoczoge1xuICAgICAgICAndnMnOiAnaHR0cHM6Ly9hcy5hbGlwYXlvYmplY3RzLmNvbS9nL2NpY2FkYS9tb25hY28tZWRpdG9yLW1pcnJvci8wLjYuMS9taW4vdnMnXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxNb25hY29FZGl0b3JcbiAgICAgICAgICAgICAgd2lkdGg9XCI4MDBcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCI2MDBcIlxuICAgICAgICAgICAgICBsYW5ndWFnZT1cImpzb25cIlxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NvZGV9XG4gICAgICAgICAgICAgIHJlcXVpcmVDb25maWc9e3JlcXVpcmVDb25maWd9XG4gICAgICAgICAgICAgIGVkaXRvcldpbGxNb3VudD17dGhpcy5lZGl0b3JXaWxsTW91bnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDI+TW9uYWNvIEVkaXRvciBTYW1wbGUgKGNvbnRyb2xsZWQgbW9kZSk8L2gyPlxuICAgICAgICAgIDxDb2RlRWRpdG9yIC8+XG4gICAgICAgICAgPGhyIC8+XG4gICAgICAgICAgPGgyPkFub3RoZXIgZWRpdG9yICh1bmNvbnRyb2xsZWQgbW9kZSk8L2gyPlxuICAgICAgICAgIDxBbm90aGVyRWRpdG9yIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxucmVuZGVyKFxuICAgIDxBcHAgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5jbGFzcyBNb25hY29FZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLl9fY3VycmVudF92YWx1ZSA9IHByb3BzLnZhbHVlO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuYWZ0ZXJWaWV3SW5pdCgpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuZGVzdHJveU1vbmFjbygpO1xuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLnByb3BzLmNvbnRleHQgfHwgd2luZG93O1xuICAgIGlmICh0aGlzLnByb3BzLnZhbHVlICE9PSB0aGlzLl9fY3VycmVudF92YWx1ZSkge1xuICAgICAgLy8gQWx3YXlzIHJlZmVyIHRvIHRoZSBsYXRlc3QgdmFsdWVcbiAgICAgIHRoaXMuX19jdXJyZW50X3ZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTtcbiAgICAgIC8vIENvbnNpZGVyIHRoZSBzaXR1YXRpb24gb2YgcmVuZGVyaW5nIDErIHRpbWVzIGJlZm9yZSB0aGUgZWRpdG9yIG1vdW50ZWRcbiAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICB0aGlzLl9fcHJldmVudF90cmlnZ2VyX2NoYW5nZV9ldmVudCA9IHRydWU7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFZhbHVlKHRoaXMuX19jdXJyZW50X3ZhbHVlKTtcbiAgICAgICAgdGhpcy5fX3ByZXZlbnRfdHJpZ2dlcl9jaGFuZ2VfZXZlbnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByZXZQcm9wcy5sYW5ndWFnZSAhPT0gdGhpcy5wcm9wcy5sYW5ndWFnZSkge1xuICAgICAgY29udGV4dC5tb25hY28uZWRpdG9yLnNldE1vZGVsTGFuZ3VhZ2UodGhpcy5lZGl0b3IuZ2V0TW9kZWwoKSwgdGhpcy5wcm9wcy5sYW5ndWFnZSk7XG4gICAgfVxuICB9XG4gIGVkaXRvcldpbGxNb3VudChtb25hY28pIHtcbiAgICBjb25zdCB7IGVkaXRvcldpbGxNb3VudCB9ID0gdGhpcy5wcm9wcztcbiAgICBlZGl0b3JXaWxsTW91bnQobW9uYWNvKTtcbiAgfVxuICBlZGl0b3JEaWRNb3VudChlZGl0b3IsIG1vbmFjbykge1xuICAgIGNvbnN0IHsgZWRpdG9yRGlkTW91bnQsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGVkaXRvckRpZE1vdW50KGVkaXRvciwgbW9uYWNvKTtcbiAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoZXZlbnQgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcblxuICAgICAgLy8gQWx3YXlzIHJlZmVyIHRvIHRoZSBsYXRlc3QgdmFsdWVcbiAgICAgIHRoaXMuX19jdXJyZW50X3ZhbHVlID0gdmFsdWU7XG5cbiAgICAgIC8vIE9ubHkgaW52b2tpbmcgd2hlbiB1c2VyIGlucHV0IGNoYW5nZWRcbiAgICAgIGlmICghdGhpcy5fX3ByZXZlbnRfdHJpZ2dlcl9jaGFuZ2VfZXZlbnQpIHtcbiAgICAgICAgb25DaGFuZ2UodmFsdWUsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBhZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IHsgcmVxdWlyZUNvbmZpZyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBsb2FkZXJVcmwgPSByZXF1aXJlQ29uZmlnLnVybCB8fCAndnMvbG9hZGVyLmpzJztcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5wcm9wcy5jb250ZXh0IHx8IHdpbmRvdztcbiAgICBjb25zdCBvbkdvdEFtZExvYWRlciA9ICgpID0+IHtcbiAgICAgIGlmIChjb250ZXh0Ll9fUkVBQ1RfTU9OQUNPX0VESVRPUl9MT0FERVJfSVNQRU5ESU5HX18pIHtcbiAgICAgICAgLy8gRG8gbm90IHVzZSB3ZWJwYWNrXG4gICAgICAgIGlmIChyZXF1aXJlQ29uZmlnLnBhdGhzICYmIHJlcXVpcmVDb25maWcucGF0aHMudnMpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcXVpcmUuY29uZmlnKHJlcXVpcmVDb25maWcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIExvYWQgbW9uYWNvXG4gICAgICBjb250ZXh0LnJlcXVpcmUoWyd2cy9lZGl0b3IvZWRpdG9yLm1haW4nXSwgKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXRNb25hY28oKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDYWxsIHRoZSBkZWxheWVkIGNhbGxiYWNrcyB3aGVuIEFNRCBsb2FkZXIgaGFzIGJlZW4gbG9hZGVkXG4gICAgICBpZiAoY29udGV4dC5fX1JFQUNUX01PTkFDT19FRElUT1JfTE9BREVSX0lTUEVORElOR19fKSB7XG4gICAgICAgIGNvbnRleHQuX19SRUFDVF9NT05BQ09fRURJVE9SX0xPQURFUl9JU1BFTkRJTkdfXyA9IGZhbHNlO1xuICAgICAgICBsZXQgbG9hZGVyQ2FsbGJhY2tzID0gY29udGV4dC5fX1JFQUNUX01PTkFDT19FRElUT1JfTE9BREVSX0NBTExCQUNLU19fO1xuICAgICAgICBpZiAobG9hZGVyQ2FsbGJhY2tzICYmIGxvYWRlckNhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICBsZXQgY3VycmVudENhbGxiYWNrID0gbG9hZGVyQ2FsbGJhY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgd2hpbGUgKGN1cnJlbnRDYWxsYmFjaykge1xuICAgICAgICAgICAgY3VycmVudENhbGxiYWNrLmZuLmNhbGwoY3VycmVudENhbGxiYWNrLmNvbnRleHQpO1xuICAgICAgICAgICAgY3VycmVudENhbGxiYWNrID0gbG9hZGVyQ2FsbGJhY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIExvYWQgQU1EIGxvYWRlciBpZiBuZWNlc3NhcnlcbiAgICBpZiAoY29udGV4dC5fX1JFQUNUX01PTkFDT19FRElUT1JfTE9BREVSX0lTUEVORElOR19fKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGF2b2lkIGxvYWRpbmcgbXVsdGlwbGUgbG9hZGVyLmpzIHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIGVkaXRvcnMgbG9hZGluZyBjb25jdXJyZW50bHlcbiAgICAgIC8vICBkZWxheSB0byBjYWxsIGNhbGxiYWNrcyBleGNlcHQgdGhlIGZpcnN0IG9uZVxuICAgICAgY29udGV4dC5fX1JFQUNUX01PTkFDT19FRElUT1JfTE9BREVSX0NBTExCQUNLU19fID0gY29udGV4dC5fX1JFQUNUX01PTkFDT19FRElUT1JfTE9BREVSX0NBTExCQUNLU19fIHx8IFtdO1xuICAgICAgY29udGV4dC5fX1JFQUNUX01PTkFDT19FRElUT1JfTE9BREVSX0NBTExCQUNLU19fLnB1c2goe1xuICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICBmbjogb25Hb3RBbWRMb2FkZXJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnRleHQucmVxdWlyZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGxvYWRlclNjcmlwdCA9IGNvbnRleHQuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIGxvYWRlclNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgIGxvYWRlclNjcmlwdC5zcmMgPSBsb2FkZXJVcmw7XG4gICAgICAgIGxvYWRlclNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Hb3RBbWRMb2FkZXIpO1xuICAgICAgICBjb250ZXh0LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyU2NyaXB0KTtcbiAgICAgICAgY29udGV4dC5fX1JFQUNUX01PTkFDT19FRElUT1JfTE9BREVSX0lTUEVORElOR19fID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uR290QW1kTG9hZGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGluaXRNb25hY28oKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnZhbHVlICE9PSBudWxsID8gdGhpcy5wcm9wcy52YWx1ZSA6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlO1xuICAgIGNvbnN0IHsgbGFuZ3VhZ2UsIHRoZW1lLCBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSB0aGlzLnJlZnMuY29udGFpbmVyO1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLnByb3BzLmNvbnRleHQgfHwgd2luZG93O1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5tb25hY28gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBCZWZvcmUgaW5pdGlhbGl6aW5nIG1vbmFjbyBlZGl0b3JcbiAgICAgIHRoaXMuZWRpdG9yV2lsbE1vdW50KGNvbnRleHQubW9uYWNvKTtcblxuICAgICAgdGhpcy5lZGl0b3IgPSBjb250ZXh0Lm1vbmFjby5lZGl0b3IuY3JlYXRlKGNvbnRhaW5lckVsZW1lbnQsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgIHRoZW1lXG4gICAgICB9LG9wdGlvbnMpKTtcbiAgICAgIC8vIEFmdGVyIGluaXRpYWxpemluZyBtb25hY28gZWRpdG9yXG4gICAgICB0aGlzLmVkaXRvckRpZE1vdW50KHRoaXMuZWRpdG9yLCBjb250ZXh0Lm1vbmFjbyk7XG4gICAgfVxuICB9XG4gIGRlc3Ryb3lNb25hY28oKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmVkaXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaXhlZFdpZHRoID0gd2lkdGgudG9TdHJpbmcoKS5pbmRleE9mKCclJykgIT09IC0xID8gd2lkdGggOiBgJHt3aWR0aH1weGA7XG4gICAgY29uc3QgZml4ZWRIZWlnaHQgPSBoZWlnaHQudG9TdHJpbmcoKS5pbmRleE9mKCclJykgIT09IC0xID8gaGVpZ2h0IDogYCR7aGVpZ2h0fXB4YDtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHdpZHRoOiBmaXhlZFdpZHRoLFxuICAgICAgaGVpZ2h0OiBmaXhlZEhlaWdodCxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj1cImNvbnRhaW5lclwiIHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPVwicmVhY3QtbW9uYWNvLWVkaXRvci1jb250YWluZXJcIj48L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuTW9uYWNvRWRpdG9yLnByb3BUeXBlcyA9IHtcbiAgd2lkdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgXSksXG4gIGhlaWdodDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICBdKSxcbiAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgbGFuZ3VhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHRoZW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxuICBlZGl0b3JEaWRNb3VudDogUHJvcFR5cGVzLmZ1bmMsXG4gIGVkaXRvcldpbGxNb3VudDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgcmVxdWlyZUNvbmZpZzogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbk1vbmFjb0VkaXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICB2YWx1ZTogbnVsbCxcbiAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgbGFuZ3VhZ2U6ICdqYXZhc2NyaXB0JyxcbiAgdGhlbWU6ICd2cycsXG4gIG9wdGlvbnM6IHt9LFxuICBlZGl0b3JEaWRNb3VudDogbm9vcCxcbiAgZWRpdG9yV2lsbE1vdW50OiBub29wLFxuICBvbkNoYW5nZTogbm9vcCxcbiAgcmVxdWlyZUNvbmZpZzoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb25hY29FZGl0b3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc3hcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9