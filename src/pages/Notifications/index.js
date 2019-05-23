import React, { Component } from 'react'
import Sidebar from 'components/sidebar/Sidebar'
import { customWrapper } from 'components/mixins'
import styled from 'styled-components'
import Notifications from 'components/notifications'

export default class index extends Component {
  render() {
    return (
      <Container>
        <Sidebar />
        <Notifications />
      </Container>
    )
  }
}

const Container = styled.div`
  ${customWrapper('80%', '0 auto')} display: flex;
`
