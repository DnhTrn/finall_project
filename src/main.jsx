import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterService } from './models/context/router/router'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid';

createRoot(document.getElementById('root')).render(
  <StyleSheetManager shouldForwardProp={isPropValid}>
    <RouterService/>
  </StyleSheetManager>
)
