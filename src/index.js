import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Clock extends Component {

    constructor(props) {
        super(props);

        this.run;
        this.secs = 0;

        this.state = {
            currentName: 'Session',
            breakLength: 1,
            sessionLength: 1,
            display: 'Time: 1 min',
            started: false,
            stopped: false
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.timer = this.timer.bind(this);
        this.setSessionLength = this.setSessionLength.bind(this);
        this.setBreakLength = this.setBreakLength.bind(this);
        this.secondsToHms = this.secondsToHms.bind(this);
    }

    startTimer(click) {
        if (!this.state.stopped) {
            if (this.state.currentName === 'Session') {
                this.secs = this.state.sessionLength * 60;
            } else {
                this.secs = this.state.breakLength * 60;
            }
        }
        this.setState({
            started: true,
            stopped: false
        });
        this.run = setInterval(this.timer, 1000);
    }

    stopTimer() {
        this.setState({
            started: false,
            stopped: true
        });
        clearInterval(this.run);
    }

    timer() {
        if (this.secs === -1) {
            if (this.state.currentName === 'Session') {
                this.secs = this.state.breakLength * 60;
                this.setState({currentName: 'Break'});
            } else {
                this.secs = this.state.sessionLength * 60;
                this.setState({currentName: 'Session'});
            }
        }
        this.setState({display: this.secondsToHms(this.secs)});
        this.secs -= 1;
        console.log(this.secs);
    }

    setSessionLength(num) {
        const change = this.state.sessionLength + num;
        const newState = {
            sessionLength: change
        };
        if (change >= 0) {
            if (this.state.currentName === 'Session') {
                newState.display = 'Time: '+change+' min';
                newState.stopped = false;
            }
            this.setState(newState)
        } else alert('STOP!')
    }

    setBreakLength(num) {
        const change = this.state.breakLength + num;
        const newState = {
            breakLength: change
        };

        if (change >= 0) {
            if (this.state.currentName === 'Break') {
                newState.display = 'Time: '+change+' min';
                newState.stopped = false;
            }
            this.setState(newState)
        } else alert('STOP!')
    }

    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
        );
    }

    render() {
        return (
            <div>
                <div> pomodoroClock</div>
                <div>
                    Set Session
                    Set Break
                    <div>
                        <button onClick={() => this.setSessionLength(1)} disabled={this.state.started}>+</button>
                        {this.state.sessionLength}
                        <button onClick={() => this.setSessionLength(-1)} disabled={this.state.started}>-</button>

                        <button onClick={() => this.setBreakLength(1)} disabled={this.state.started}>+</button>
                        {this.state.breakLength}
                        <button onClick={() => this.setBreakLength(-1)} disabled={this.state.started}>-</button>
                    </div>
                </div>
                {this.state.currentName}
                <div >
                    <input type="text" value={this.state.display} readOnly/>
                </div>
                <div>
                    <button onClick={this.startTimer} disabled={this.state.started}>start</button>
                    <button onClick={this.stopTimer}>stop</button>
                </div>
            </div>
        )
    }
}
render(<Clock />, document.getElementById('container'));
