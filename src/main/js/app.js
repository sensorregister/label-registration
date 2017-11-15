'use strict';

var jQuery = require("jquery");
import 'bootstrap';
import '../style/register.scss'

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const Instascan = require('instascan');
const Bacon = require('baconjs');
// end::vars[]

// tag::app[]
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {telephoneNumber: null, codes: []};
    }

    componentDidMount() {
    }

    render() {
        return (
            <RegisterApp />
        );
    }
}
// end::app[]

// tag::viewfinder[]
class Viewfinder extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {

        var videoStyle = {
            transform: 'scaleX(-1)'
        };

        return (
            <div><video id={this.props.id} autoPlay={true} style={videoStyle}></video></div>
        )
    }
}
// end::employee-list[]

class Scanner extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            cameras: [],
            activeCameraId: localStorage.getItem('activeCameraId')};

        this._viewFinder = <Viewfinder id={"finder1"}/>;

        //this.handleClick = this.handleClick.bind(this);
        this.renderCamera = this.renderCamera.bind(this);
    }

    componentDidMount() {
        var self = this;

        var scanner = new Instascan.Scanner({ video: document.getElementById('finder1'), scanPeriod: 5 })
        scanner.addListener('scan', this.props.scanListener);
        this._scanner = scanner;

        Instascan.Camera.getCameras().then(function (cameras) {
            self.setState({cameras: cameras});
            if (cameras.length > 0) {
                var camera = cameras.find(c => c.id === self.state.activeCameraId);
                if (camera === undefined) {
                    camera = cameras[0];
                    self.setState({activeCameraId: cameras[0].id})
                }
                scanner.start(camera);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    handleClick = (camera) => (e) => {
        this.setState({activeCameraId: camera.id});
        localStorage.setItem('activeCameraId', camera.id);
        this._scanner.start(camera);
    };

    renderCamera(camera) {

        if (camera.id === this.state.activeCameraId) {
            return (<li key={camera.id} className={"list-group-item active"}>{camera.name}</li>)
        }
        else {
            return (<li key={camera.id} onClick={this.handleClick(camera)}
                        className={"list-group-item"}>{camera.name}</li>)
        }
    }

    render() {

        return (
            <div className={"row"}>
                <ul className={"list-group col"}>
                    {this.state.cameras.map(this.renderCamera)}
                </ul>
            <div className={"col"}>{this._viewFinder}</div>
            </div>
        )
    }

}

Scanner.defaultProps = {
    scanListener: (content, image) => window.console.log({ date: +(Date.now()), content: content })
};

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.error !== undefined) {
            return (
                <div>
                    <div className="alert alert-danger" role="alert">
                        {this.props.error}
                    </div>
                </div>);
        }

        return(null);
    }
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.tryAddCode = this.tryAddCode.bind(this);
        this.setTelephoneNumber = this.setTelephoneNumber.bind(this)
        this.state = {codes: [], telephoneNumber: ''}
    }

    beep() {
        var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        snd.play();
    }

    componentDidMount() {
        this.props.scanBus.onValue((v) => this.tryAddCode(v));
    }

    tryAddCode(code) {
        if (this.state.codes.includes(code)) {
            return;
        }

        var codes = this.state.codes;
        codes.push(code);

        this.setState({codes: codes});
        this.beep();
    }

    static renderCode(code) {
        return (<li key={code} className={"list-group-item"}>{code}</li>)
    }

    setTelephoneNumber(event) {
        this.setState({telephoneNumber: event.target.value});
    }

    submit(event) {
        event.preventDefault();
        var self = this;
        $.ajax({
            url: "register",
            contentType: "application/json",
            type: "POST",
            cache: false,
            data: JSON.stringify({telephoneNumber: self.state.telephoneNumber, codes: self.state.codes})
        }).done(function (data, textStatus, jqXHR) {
            self.setState({telephoneNumber: '', codes: [], error: undefined})
        }).fail(function( xhr) {
            self.setState({error: xhr.responseJSON.error + " - " + xhr.responseJSON.exception + " - " + xhr.responseJSON.message});
        });
    }

    render() {
        return (
            <div className={"row"}>
                <ul className={"list-group col-3"}>
                    {this.state.codes.map(RegisterForm.renderCode)}
                </ul>
                <form className={"col-9"}>
                    <Error error={this.state.error} />
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Telefoonnummer</label>
                        <input type="tel" className="form-control"
                               onChange={this.setTelephoneNumber} placeholder="Telefoonnummer" value={this.state.telephoneNumber} />
                    </div>
                    <button type="submit" onClick={this.submit} className="btn btn-primary">Registreer</button>
                </form>
            </div>
        );
    }
}

class RegisterApp extends React.Component {

    constructor(props) {
        super(props);
        this._scanBus = new Bacon.Bus();
    }

    listen = (content, image) => { this._scanBus.push(content); };

    render() {
        return (
            <div>
            <div className={"card bg-light mb-3"}>
              <div className={"card-header"}>Preview</div>
              <div className={"card-body"}>
                  <Scanner scanListener={this.listen}/>
              </div>
            </div>
            <div className={"card bg-light mb-3"}>
                <div className={"card-header"}>Registreer</div>
                <div className={"card-body"}>
                    <RegisterForm scanBus={this._scanBus} />
                </div>
            </div>
            </div>
        )
    }
}


// tag::render[]
ReactDOM.render(
    <App />,
    document.getElementById('react')
)
// end::render[]
