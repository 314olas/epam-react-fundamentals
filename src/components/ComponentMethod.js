import React from "react";

export default class ComponentMethod extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputName: '', data: null };
        this.inputHandler = this.inputHandler.bind(this);
    }

    componentDidMount() {
        const _that = this
        fetch('https://demo.treblle.com/api/v1/articles/10')
        .then(res => res.json())
        .then(data => this.setState(_that.state.data = data.article))
    }

    inputHandler(e) {
        this.setState({...this.state, [e.target.name]: e.target.value})
    }

    render() {
        return (
            <>
                <h2>ComponentMethod</h2>
                <input type="text" name='inputName' onChange={this.inputHandler} value={this.state.inputName} />
                <span>{JSON.stringify(this.state.data)}</span>
            </>
        )
    }
}