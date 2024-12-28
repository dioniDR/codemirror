// Version: 3.0.0 - Last updated: [current date and time]

const { useState, useEffect, useRef } = React;

function App() {
    const editorRef = useRef(null);
    const [code, setCode] = useState('<h1>Hello, Resizable CodeMirror!</h1>');
    const [output, setOutput] = useState('');
    const [output2, setOutput2] = useState('');
    const [output3, setOutput3] = useState('');
    const [verticalSplit, setVerticalSplit] = useState(50);
    const [horizontalSplit, setHorizontalSplit] = useState(50);

    useEffect(() => {
        if (editorRef.current) {
            const editor = CodeMirror.fromTextArea(editorRef.current, {
                mode: 'htmlmixed',
                theme: 'monokai',
                lineNumbers: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                matchBrackets: true,
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                extraKeys: {
                    'Ctrl-Space': 'autocomplete',
                    'Ctrl-/': 'toggleComment',
                    'Cmd-/': 'toggleComment',
                    'Alt-F': 'findPersistent',
                    'Ctrl-F': 'findPersistent',
                },
                hintOptions: {
                    completeSingle: false,
                    extraKeys: {
                        Right: CodeMirror.hint.acceptSelected,
                        Tab: CodeMirror.hint.acceptSelected,
                    }
                },
                indentUnit: 2,
                tabSize: 2,
                indentWithTabs: false,
                lineWrapping: true,
                styleActiveLine: true,
            });

            editor.on('change', (instance) => {
                setCode(instance.getValue());
            });

            return () => {
                editor.toTextArea();
            };
        }
    }, []);

    const runCode = () => {
        setOutput(code);
        
    };
    const runCode2 = () => {
        setOutput2(code);
    };
    
    const runCode3 = () => {
        setOutput3(code);
    };

    const handleCenterDrag = (e) => {
        const container = e.target.parentElement;
        const startX = e.clientX;
        const startY = e.clientY;
        const startVerticalSplit = verticalSplit;
        const startHorizontalSplit = horizontalSplit;
    
        const doDrag = (e) => {
            const newVerticalSplit = startVerticalSplit + ((e.clientX - startX) / container.offsetWidth) * 100;
            const newHorizontalSplit = startHorizontalSplit + ((e.clientY - startY) / container.offsetHeight) * 100;
            setVerticalSplit(Math.min(Math.max(newVerticalSplit, 10), 90));
            setHorizontalSplit(Math.min(Math.max(newHorizontalSplit, 10), 90));
        };
    
        const stopDrag = () => {
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
        };
    
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
    };
    return (
        <div className="flex flex-col h-screen">
            <nav className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">Resizable CodeMirror Editor</h1>
            </nav>
            <div className="flex-1 relative">
                <div className="absolute inset-0 flex">
                    <div style={{width: `${verticalSplit}%`}} className="flex flex-col">
                        <div style={{height: `${horizontalSplit}%`}} className="p-2">
                            <textarea ref={editorRef} defaultValue={code} className="w-full h-full" />
                        </div>
                        <div style={{height: `${100 - horizontalSplit}%`}} className="p-2">
                            <button
                                onClick={runCode2}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
                            >
                                Run Code (Panel 3)
                            </button>
                            <div
                                className="border border-gray-300 rounded p-4 h-[calc(100%-40px)] overflow-auto"
                                dangerouslySetInnerHTML={{ __html: output2 }}
                            />
                        </div>
                    </div>
                    <div style={{width: `${100 - verticalSplit}%`}} className="flex flex-col">
                        <div style={{height: `${horizontalSplit}%`}} className="p-2">
                            <button
                                onClick={runCode}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                            >
                                Run Code (Panel 2)
                            </button>
                            <div
                                className="border border-gray-300 rounded p-4 h-[calc(100%-40px)] overflow-auto"
                                dangerouslySetInnerHTML={{ __html: output }}
                            />
                        </div>
                        <div style={{height: `${100 - horizontalSplit}%`}} className="p-2">
                            <button
                                onClick={runCode3}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-2"
                            >
                                Run Code (Panel 4)
                            </button>
                            <div
                                className="border border-gray-300 rounded p-4 h-[calc(100%-40px)] overflow-auto"
                                dangerouslySetInnerHTML={{ __html: output3 }}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="absolute w-6 h-6 bg-gray-400 rounded-full cursor-move"
                    style={{
                        top: `calc(${horizontalSplit}% - 12px)`,
                        left: `calc(${verticalSplit}% - 12px)`
                    }}
                    onMouseDown={handleCenterDrag}
                ></div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));