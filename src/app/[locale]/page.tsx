import DataSourcePage from '@/app/[locale]/datasource/page'
import MainLayout from '../layouts/main-layout'

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="w-full max-w-2xl">
          <DataSourcePage />
        </div>
      </div>
    </MainLayout>
  )
}
