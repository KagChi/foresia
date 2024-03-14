import { useState } from "react"

export const App = () => {
    const [state, setState] = useState(1);
    return (
        <>
            <title>Hello World</title>

            <div style={{ display: "flex", flexDirection: "column", padding: "2px", gap: 2 }}>
                Message counter: {state}
                <button style={{ width: "200px" }} onClick={() => setState(state + 1)}>Add message</button>
            </div>
        </>
    )
}