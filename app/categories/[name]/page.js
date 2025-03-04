import ContentDisplay from '@/components/ContentDisplay'
import { getDocument } from '@/lib/doc'
import { getDocumentsByCategory } from '@/utils/doc-util'
import React from 'react'

const CategoriesPage = ({params:{name}}) => {
  const docs= getDocument()
  const matcheDocs=getDocumentsByCategory(docs,name)
  return (
    <div>
      <ContentDisplay  id={matcheDocs[0].id}/>
    </div>
  )
}

export default CategoriesPage