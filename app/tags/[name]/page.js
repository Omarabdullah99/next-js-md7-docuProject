import ContentDisplay from '@/components/ContentDisplay'
import { getDocument } from '@/lib/doc'
import { getDocumentsByTag } from '@/utils/doc-util'
import React from 'react'

const TagsPage = ({params:{name}}) => {
   const docs= getDocument()
    const matcheDocs=getDocumentsByTag(docs,name)
  return (
    <div>
      <ContentDisplay  id={matcheDocs[0].id}/>
    </div>
  )
}

export default TagsPage