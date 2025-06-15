'use client'

import Handsontable from 'handsontable'
import React from 'react'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from '@/components/ui/menubar'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Preview } from './preview'

interface TableToolbarProps {
  hotRef: React.RefObject<any>
  selectionRange?: Handsontable.CellRange[] | null
  onSetSelectionRange?: (ranges: Handsontable.CellRange[] | null) => void
  tableDesignId: string
}

const zIndex = 'z-200'

export const TableToolbar: React.FC<TableToolbarProps> = ({
  hotRef,
  selectionRange,
  tableDesignId,
}) => {
  const applyStyle = (style: Partial<CSSStyleDeclaration>) => {
    const hot = hotRef.current.hotInstance
    if (!hot) return
    selectionRange?.forEach((selected) => {
      for (let row = selected.from.row; row <= selected.to.row; row++) {
        for (let col = selected.from.col; col <= selected.to.col; col++) {
          const meta = hot.getCellMeta(row, col)
          meta.className = meta.className || ''

          // 储存 style 到 cell meta
          meta.style = { ...(meta.style || {}), ...style }

          hot.setCellMeta(row, col, 'style', meta.style)
        }
      }
    })

    // 更新渲染器
    hot.render()
  }

  const mergeCells = () => {
    const hot = hotRef.current.hotInstance
    if (!hot) return
    const selected = hot.getSelectedRangeLast()
    if (!selected) return
    const mergePlugin = hot.getPlugin('mergeCells')
    // mergePlugin.merge(selected);
  }

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>字体</MenubarTrigger>
          <MenubarContent className={zIndex}>
            <MenubarItem onClick={() => applyStyle({ fontWeight: 'bold' })}>加粗</MenubarItem>
            <MenubarItem onClick={() => applyStyle({ fontSize: '16px' })}>字体大小</MenubarItem>
            <MenubarItem onClick={() => applyStyle({ color: 'red' })}>字体颜色</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>背景</MenubarTrigger>
          <MenubarContent className={zIndex}>
            <MenubarItem onClick={() => applyStyle({ backgroundColor: 'yellow' })}>
              黄色背景
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>单元格</MenubarTrigger>
          <MenubarContent className={zIndex}>
            <MenubarItem onClick={mergeCells}>合并单元格</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  )
}
