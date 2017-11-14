'use strict';

var jQuery = require("jquery");
import 'bootstrap';
import '../style/register.scss'

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const Instascan = require('instascan');
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

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
    }

    renderCode(code) {
        return (<li key={code} className={"list-group-item"}>{code}</li>)
    }

    render() {
        return (
            <div className={"row"}>
                <ul className={"list-group col-3"}>
                    {this.props.codes.map(this.renderCode)}
                </ul>
                <form className={"col-9"}>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Telefoonnummer</label>
                        <input type="email" className="form-control" id="phoneNumber"  placeholder="Telefoonnummer" />
                    </div>
                    <button type="submit" className="btn btn-primary">Registreer</button>
                </form>
            </div>
        );
    }
}

class RegisterApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {codes: []};
    }

    tryAddCode(code) {
        if (this.state.codes.includes(code)) {
            return;
        }

        var codes = this.state.codes;
        codes.push(code);

        this.setState({codes: codes})
    }

    listen = (content, image) => { this.tryAddCode(content); }

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
                    <RegisterForm codes={this.state.codes}/>
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
