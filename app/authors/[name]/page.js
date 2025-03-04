import ContentDisplay from '@/components/ContentDisplay'
import { getDocument } from '@/lib/doc'
import { getDocumentsByAuthor } from '@/utils/doc-util'
import React from 'react'

const AuthorPage = ({params:{name}}) => {
  const docs= getDocument()
  const matcheDocs=getDocumentsByAuthor(docs,name)
  return (
    <div>
      <ContentDisplay id={matcheDocs[0].id}/>
    </div>
  )
}

export default AuthorPage