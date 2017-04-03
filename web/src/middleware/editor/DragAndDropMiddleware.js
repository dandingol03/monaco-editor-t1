
import _ from 'lodash'
import Middleware from '../Middleware'
import {

} from '../../constants/monacoConstants'


/**
 * Middleware for highlighting and clicking specific token types
 */
class DragAndDropMiddleware extends Middleware {

    constructor() {
        super()

        this._markers = []
        this._keyMap = {}
        this.setHover = _.throttle(this.setHover.bind(this), 100)
    }

    get eventListeners() {
        return this._keyMap
    }

    _addOverlayWidget(pos)
    {

        var overlayWidget = {
            domNode: null,
            getId: function() {
                return 'cursor.widget';
            },
            getDomNode: function() {
                if (!this.domNode) {
                    this.domNode = document.createElement('div');
                    this.domNode.style.width='2px';
                    this.domNode.style.height='16px';
                    this.domNode.style.background = '#222';
                    this.domNode.style.left = pos.left+'px';
                    this.domNode.style.top = pos.top+'px';
                }
                return this.domNode;
            },
            getPosition: function() {
                return pos
            }
        };

        //保存其的引用
        this._overlayWidget=overlayWidget;
        this._IStandaloneCodeEditor.addOverlayWidget(overlayWidget)

    }

    cleanCursorWidget()
    {
        if (! this._IStandaloneCodeEditor) {
            return
        }
        //clean previous overlayWidget
        if(this._overlayWidget)
        {
            this._IStandaloneCodeEditor.removeOverlayWidget(this._overlayWidget);
            this._overlayWidget=null;
        }
    }


    setHover(isOver, offset) {
        if (! this._IStandaloneCodeEditor) {
            return
        }
        //当组件位于编辑器上方期间
        if (isOver) {
            //TODO:set cursor from monaco api

            var mouseTarget=this._IStandaloneCodeEditor.getTargetAtClientPoint(offset.x,offset.y);
            var position=mouseTarget.position;
            if(position)
            {
                this._IStandaloneCodeEditor.setPosition(position)


                //clean previous overlayWidget
                if(this._overlayWidget)
                {
                    this._IStandaloneCodeEditor.removeOverlayWidget(this._overlayWidget);
                    this._overlayWidget=null;
                }


                //add a overlayWidget to the cursor position
                var info=this._IStandaloneCodeEditor.getScrolledVisiblePosition(position);
                this._addOverlayWidget({left:info.left,top:info.top})
            }
        } else {
            if(this._overlayWidget)
            {
                this._IStandaloneCodeEditor.removeOverlayWidget(this._overlayWidget);
                this._overlayWidget=null;
            }
        }
    }

    attach(_IStandaloneCodeEditor) {
        if (! _IStandaloneCodeEditor) {
            return
        }

        this._IStandaloneCodeEditor = _IStandaloneCodeEditor
    }

    detach() {
        if (! this._IStandaloneCodeEditor) {
            return
        }

        this._IStandaloneCodeEditor = null
    }

}

const middleware = new DragAndDropMiddleware()

export default (dispatch) => {
    middleware.dispatch=dispatch
    return middleware
}
