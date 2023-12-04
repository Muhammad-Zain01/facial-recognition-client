import React from "react"
import UIBox from './components/ui-box/ui-box'

function App() : JSX.Element {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '700px' }}>
        <UIBox>
          Register Face
        </UIBox>
        <UIBox>
          Check Face
        </UIBox>
      </div>
    </>
  )
}

export default App
