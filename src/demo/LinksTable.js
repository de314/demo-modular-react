import React from 'react'
import _ from 'lodash'
import moment from 'moment'

import { Link } from 'react-router-dom'

const LinkTimeCell = ({ curr, prev, max }) => {
  let diff = !!curr && !!prev ? curr - prev : null
  if (!!max && diff > max) {
    diff = null
  }
  return (
    <td className="LinkTimeCell">
      {curr && moment(curr).format('h:mm:ss.SSSS')}{' '}
      {diff !== null && `(+${diff}ms)`}
    </td>
  )
}

const LinkRow = ({ page }) => (
  <tr className="LinkRow">
    <td>
      <Link to={page.href}>{page.name}</Link>
    </td>
    <LinkTimeCell curr={page.registered} />
    <LinkTimeCell
      curr={page.requested}
      prev={page.registered}
      max={page.href === '/pre/delay' ? null : 1000}
    />
    <LinkTimeCell curr={page.loaded} prev={page.requested} />
  </tr>
)

const LinksTable = ({ pages }) => (
  <div className="LinksTable">
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Registered</th>
          <th>Requeted</th>
          <th>Loaded</th>
        </tr>
      </thead>
      <tbody>
        {_.map(pages, (page, name) => <LinkRow page={page} key={name} />)}
      </tbody>
    </table>
  </div>
)

export default LinksTable
