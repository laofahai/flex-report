import MainLayout from '../layouts/main-layout'

export default async function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full w-full">
        Hi, welcome to Flex Report!
      </div>
    </MainLayout>
  )
}
