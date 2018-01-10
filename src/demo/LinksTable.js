import React from 'react'
import _ from 'lodash'

import { Link } from 'react-router-dom'

const LinkTimeCell = ({ curr, prev, max, min }) => {
  let diff = !!curr && !!prev ? curr - prev : null
  if ((!!max && diff > max) || (!!min && diff < min)) {
    diff = null
  }
  return (
    <td className="LinkTimeCell">
      {curr} {diff !== null && `(+${diff}ms)`}
    </td>
  )
}

const LinkRow = ({ page }) => (
  <tr className="LinkRow">
    <td>
      <Link to={page.href}>{page.name}</Link>
    </td>
    <LinkTimeCell curr={page.registered} />
    <LinkTimeCell curr={page.requested} prev={page.registered} />
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
