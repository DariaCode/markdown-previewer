import React from 'react';
import marked from 'marked'
import './App.css';

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class App extends React.Component{
    constructor(props) {
      super(props);
      this.state =  {
        markdown: placeholder,
        maxEditor: false,
        maxPreview: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleMaxEditor = this.handleMaxEditor.bind(this);
      this.handleMaxPreview = this.handleMaxPreview.bind(this);
    }
    handleChange(event) {
      this.setState({
        markdown: event.target.value
      });
    }
    handleMaxEditor() {
      this.setState({
        maxEditor: !this.state.maxEditor
      });
    }
    handleMaxPreview() {
      this.setState({
        maxPreview: !this.state.maxPreview
      });
    }
    render() {
      const classes = this.state.maxEditor ? 
            ['editorWrap column maximized', 
             'previewWrap column hide', 
             'fas fa-compress-arrows-alt'] : 
            this.state.maxPreview ?
            ['editorWrap column hide', 
             'previewWrap column maximized', 
             'fas fa-compress-arrows-alt'] :
            ['editorWrap column', 
             'previewWrap column', 
             'fas fa-expand-arrows-alt'];
      return (
        <div id="main-container">
          <div className={classes[0]} id="inputArea" > 
            <ToolbarEditor 
              icon={classes[2]} 
              onClick={this.handleMaxEditor}
              text="Editor"/>
            <Editor markdown={this.state.markdown} 
              onChange={this.handleChange} />
          </div>
          <div className={classes[1]} id="displayArea">
            <ToolbarPreview
              icon={classes[2]} 
              onClick={this.handleMaxPreview}
              text="Previewer"/>
            <Preview  markdown={this.state.markdown}/>
          </div>
        </div> 
      )
    }
  };

const Editor = (props) => {
    return (
      <div id="input-B" className="col-body">
        <textarea id="editor"
        value={props.markdown}
        onChange={props.onChange}
        type="text"/>
        </div>
      )
  }
const ToolbarEditor = (props) => {
    return (
      <div className="toolbar col-head" id="input-H">
        <h1><span className="head-icon"><i title="no-stack-dub-sack" className="far fa-file-code"/></span>      
        {props.text} </h1>
        <button id="input-btn" onClick={props.onClick} className="head-btn"><i className={props.icon}></i></button>
      </div>
   )
}

const ToolbarPreview = (props) => {
  return (
    <div className="toolbar col-head" id="display-H">
      <h1><span className="head-icon"><i title="no-stack-dub-sack" className="far fa-file-alt"/></span>      
      {props.text} </h1>
      <button id="display-btn" onClick={props.onClick} className="head-btn"><i className={props.icon}></i></button>
    </div>
 )
}

const Preview = (props) => {
  return (
    <div id="display-B" className="col-body">
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />
      </div>
    )
}

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}



export default App;