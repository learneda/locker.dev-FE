import React, { Component } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { withAlert } from 'react-alert'
import styled from 'styled-components'
import { Grommet } from 'grommet'
import { customLayout, customWrapper } from '../../components/mixins'
import ProfileSettings from './ProfileSettings'
import Integrations from './Integrations'

class Settings extends Component {
  render() {
    return (
      <Grommet theme={theme}>
        <Wrapper>
          <BrowseContainer>
            <Tabs>
              <Tab>
                <NavLink to='/settings'>Settings</NavLink>
              </Tab>
              <Tab>
                <NavLink to='/settings/integrations'>Integrations</NavLink>
              </Tab>
            </Tabs>
            <TabWrapper>
              <Switch>
                <Route
                  exact
                  path={['/settings']}
                  render={props => <ProfileSettings {...props} />}
                />

                <Route
                  path='/settings/integrations'
                  render={props => <Integrations />}
                />
              </Switch>
            </TabWrapper>
          </BrowseContainer>
        </Wrapper>
      </Grommet>
    )
  }
}

const SettingsWithAlert = withAlert()(Settings)

export default SettingsWithAlert

const theme = {
  tab: {
    color: 'dark-1',
    active: {
      weight: 'bold',
    },
    border: {
      side: 'bottom',
      size: 'medium',
      color: {
        light: null,
      },
      active: {
        color: {
          light: 'dark-1',
        },
      },
      hover: {
        color: {
          light: null,
        },
      },
    },
    margin: {
      vertical: 'small',
      horizontal: 'xsmall',
    },
  },
}

const BrowseContainer = styled.div`
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  @media(max-width: 768px) {
    ${customWrapper('90%', '0 auto')}
  }
`

const TabWrapper = styled.div`
  padding-top: 20px;
  margin-top: -3px;
`

const Tabs = styled.ul`
  display: flex;
`

const Tab = styled.li`
  margin-right: 2rem;
`

// const Wrapper = styled.div`
// 	${customWrapper('80%', '0 auto')}
// 	@media (max-width: 768px) {
// 		${customWrapper('90%', '0 auto')};
// 	}
// 	h2 {
// 		font-size: 3.5rem;
// 		margin: 35px 0;
// 	}
// `;

// const FormGroup = styled.form`
//   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
//   border-radius: 5px;
//   background: #fff;
//   ${customWrapper('100%', '0 auto')} padding: 20px;
//   @media (max-width: 768px) {
//     padding: 0px;
//   }

//   .form-wrapper {
//     padding: 10px;
//     ${customLayout()} ${customWrapper('80%', '0 auto')} flex-direction: column;
//     @media (max-width: 1100px) {
//       ${customWrapper('100%', '0 auto')};
//     }
//     .row {
//       padding: 10px;
//       ${customLayout('space-between')} @media (max-width: 650px) {
//         flex-direction: column;
//       }
//       .col-2 {
//         width: 50%;
//         padding: 10px;
//         ${customLayout()} flex-wrap: wrap;
//         @media (max-width: 650px) {
//           width: 100%;
//         }

//         label {
//           width: 100%;
//           padding: 20px 0;
//           color: gray;

//           input,
//           textarea {
//             width: 100%;
//             border: 1px solid rgba(0, 0, 0, 0.33);
//             margin-top: 10px;
//             border-radius: 5px;
//             padding: 10px;
//             color: #333;
//             resize: none;

//             &:focus {
//               outline: none;
//               border: 1px solid #3e66f2;
//             }
//           }

//           textarea {
//             height: 100px;
//           }
//         } // label
//       } // col-2
//     } // row

//     .btn-group {
//       ${customLayout('flex-end')} width: 100%;
//       padding: 20px;

//       button {
//         width: 15%;
//         min-width: 100px;
//         margin-left: 30px;
//         border: 1px solid transparent;
//         border-radius: 5px;
//         padding: 10px 0;
//         background-color: #3e66f2;
//         color: white;
//         font-weight: 700;
//         font-size: 1.6rem;
//         transition: 200ms ease-in;
//         cursor: pointer;

//         &:hover {
//           background-color: #3059f3;
//         }
//       }

//       a {
//         padding-top: 13px;
//         transition: 150ms ease-in;
//         font-weight: 700;

//         &:hover {
//           color: #3e66f2;
//         }
//       }
//     }
//   }
// `
