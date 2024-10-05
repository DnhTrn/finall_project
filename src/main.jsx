import { createRoot } from 'react-dom/client'
import './index.css'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid';
import RouteService from './view-models/viewVM/routeService';

createRoot(document.getElementById('root')).render(
  <StyleSheetManager shouldForwardProp={isPropValid}>
    <RouteService/>
  </StyleSheetManager>
)
