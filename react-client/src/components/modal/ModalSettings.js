import React from 'react';
import './style.css';

class ModalSettings extends React.Component {
    constructor(props){
        super(props);
        this.state={  
            token: this.props.token,
            aplha: this.props.alpha,
            pattern: this.props.pattern,
        };
        this.onChangeToken = this.onChangeToken.bind(this);
        this.onChangeAlpha = this.onChangeAlpha.bind(this);
        this.onChangePattern = this.onChangePattern.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    onChangeToken(e) { 
        this.setState({token:e.target.value});
    }

    onChangeAlpha(e) { 
        this.setState({alpha:e.target.value});
    }

    onChangePattern(e) { 
        this.setState({pattern:e.target.value});
    }

    saveSettings(){
        let token = this.state.token;
        let alpha = this.state.alpha;
        let pattern = this.state.pattern;
        this.props.saveSettings(token,alpha,pattern);
    }

    componentWillMount(){
        this.setState({
        token: this.props.token,
        alpha: this.props.alpha,
        pattern: this.props.pattern,
        });
        
        console.log(this.state.pattern);

    }

    render() {

        const isOpen = this.props.isOpen;
        if(!isOpen) return null;
        return (   
            <div className="modal fade show">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Settings</h5>
                        <button type="button" className="close" onClick={this.props.closeSettings}>
                        <span >&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="control-label">Token</label>
                            <input type="text" onChange={this.onChangeToken} className="form-control" defaultValue={this.state.token} placeholder="Input token" required/>                      
                        </div>
                        <div className="form-group">
                            <label className="control-label">Alpha name</label>
                            <input type="text" onChange={this.onChangeAlpha} className="form-control" defaultValue={this.state.alpha} placeholder="Input alpha name" required/>                      
                        </div>
                        <div className="form-group">
                            <label className="control-label">Pattern</label>
                            <textarea onChange={this.onChangePattern} className="form-control"  value={this.state.pattern} placeholder="Input pattern" rows="3"></textarea>                      
                        </div>
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.saveSettings}>Save changes</button>
                            <button type="button" className="btn btn-secondary" onClick={this.props.closeSettings} >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ModalSettings;