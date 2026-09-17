const App = () => {
    //Created with CoPilot on 9-15-2026
    /**
     * When the button is pressed, take the text in the user textbox and feed it to
     * GovAI. If you can query, return that response and put it in the next textbox
     */
    const askAI = () => {
        //help with copilot
        let input = document.getElementById("userInput") as HTMLInputElement | null;
        let responseElement = document.getElementById("aiResponse");
        
        if (!input || !responseElement) return;
        
        const text = input.value.trim();

        if (!text) {
            responseElement!.innerHTML = "Please enter a question!";
        } else {
            responseElement!.innerHTML = "You typed " + text +
                ",\nbut we haven't implemented a connection to GovAI yet :(";
        }
        /*
        if (input!.nodeValue === null || input!.nodeValue.length === 0) {
            responseElement!.innerHTML = "Please enter a question!";
        } else {
            responseElement!.innerHTML = "We would load here, but we haven't implemented a connection to GovAI yet :(";
        }

         */
    };

    return (
        <>
            <h1>Welcome to the GovAi Test Website!</h1>
            <p>Ask the AI to help you with a question in the left box!</p>
            <table>
                <tbody>
                <tr>
                    <td>
                    <input type="text" id="userInput" placeholder="Ask a question..."/>
                    </td>
                    <td>
                    <p id="aiResponse">Type a question in the box next to me...</p>
                    </td>
                </tr>
                </tbody>
            </table>
            <button name="askAI" onClick={askAI}>
                Ask GovAI!
            </button>
        </>
    );
};

export default App;