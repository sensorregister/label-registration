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
            viewFinder: <Viewfinder id={"finder1"}/>,
            cameras: [],
            scanner: null,
            activeCameraId: -1}
    }

    componentDidMount() {
        var state = this.state;
        state.scanner = new Instascan.Scanner({ video: document.getElementById('finder1'), scanPeriod: 5 })
        state.scanner.addListener('scan', function (content, image) {
            window.console.log({ date: +(Date.now()), content: content });
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            state.cameras = cameras;
            if (cameras.length > 0) {
                state.activeCameraId = cameras[0].id;
                state.scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    render() {
        return (
            <div>{this.state.viewFinder}</div>
        )
    }

}

class RegisterApp extends React.Component {
    render() {
        return (

            <div className={"card bg-light mb-3"}>
              <div className={"card-header"}>Camera</div>
              <div className={"card-body"}>
                 <div className={"row"}><Scanner/></div>
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
