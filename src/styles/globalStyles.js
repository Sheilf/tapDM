// using the styled-components is reasonable.
// A lot of people prefer to use it
// i'm not that concerned with it tbh. 
// I find it unnecessary. For the most part you can
// handles CSS with a JSON or function.
// styled-components and other libraries probably handle some optomizations
// but thats not really a concern for this.

/**
 * for example:
 * 
  CenterThePage = (flexDirection) => {
    display: 'flex', 
    flexDirection: flexDirection (can be row or column)
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    minHeight: '100vh'
  }

  CenterThePage = (flexDirection, isSelectedState) => {
    display: 'flex', 
    flexDirection: flexDirection (can be row or column)
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    minHeight: '100vh',
    color: isSelectedState ? 'green' : 'light-gray'
  }
 * 
 * 
 */

export const transitionVisibility = (isVisible) => {
  return {
    transition: '0.3s all ease-in-out',
    opacity: isVisible ? '1' : '0',
    textAlign: 'center'
  }
}

export const CenterThePage = {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    minHeight: '100vh' 
}

export const CenterColumnWithFlexbox = {
    display: 'flex', 
    flexDirection:"column", 
    justifyContent: 'center', 
    alignItems: 'center'
}

export const SideInputLabel = {
  display: 'flex',
}