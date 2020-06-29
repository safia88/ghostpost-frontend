import React from 'react'


export class CreatePost extends React.Component {
    state = {
        data: {
            is_boast: false,
            content: ''
        }
    };

    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };

        if (input.type === 'checkbox')
            data[input.name] = input.checked;
        else
            data[input.name] = input.value;

        this.setState({ data });
    };

    createPost = () => {
        fetch("http://localhost:8000/api/post/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.data)
        })
            .then(res => window.location.reload());
    }

    handleSubmit = e => {
        e.preventDefault();
        this.createPost();
    }

    render() {
        return (
            <div>
                <h3>Create Post</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Check for Boast: </label>
                        <input type="checkbox" id="is_boast" name="is_boast" value={this.props.is_boast} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <input type="text" id="content" name="content" value={this.props.title} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }
}
