// import { prisma } from ''
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
// import Header from 'components/header'
// import { ToastContainer, toast } from 'react-toastify'

// const prisma = new PrismaClient();

// export async function getStaticProps({ params }) {
//   const noticia = await prisma.noticias.findUnique({
//     where: { id: parseInt(params.id) },
//   });

//   return {
//     props: {
//       noticia: {
//         ...noticia,
//         imagem: {
//           ...noticia.imagem,
//           data: noticia.imagem
//             ? Buffer.from(noticia.imagem).toString("base64")
//             : null,
//         },
//       },
//     },
//   };
// }

// export async function getStaticPaths() {
//   const memory = await prisma.memory.find()

//   const paths = memory.map((noticia) => ({
//     params: { id: noticia.id.toString() },
//   }))

//   return { paths, fallback: false }
// }

dayjs.locale(ptBR)

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

async function MemoryInfo() {
  const router = useRouter()
  const response = await api.get(`/memories/${memory.id}`)
  console.log(response)
  // const response = await api.get('/memories', {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })

  const memory: Memory[] = response.data

  if (router.isFallback) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-4">
      <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>
      <Image
        src={memory.coverUrl}
        alt=""
        width={592}
        height={280}
        className="aspect-video w-full rounded-lg object-cover"
      />
      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>
    </div>
  )
}

export default MemoryInfo
