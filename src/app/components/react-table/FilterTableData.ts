export interface BasicsTableDataType {
  invoiceno: string
  status: string
  name: string
  post: string
  imgsrc: string
  progress: number
}

export const basicsTableData: BasicsTableDataType[] = [
  {
    invoiceno: "001",
    status: "Paid",
    name: "Sunil Joshi",
    post: "Web Designer",
    imgsrc: "/images/profile/user-7.jpg",
    progress: 78,
  },
  {
    invoiceno: "002",
    status: "Cancelled",
    name: "Andrew McDownland",
    post: "Project Manager",
    imgsrc: "/images/profile/user-3.jpg",
    progress: 45,
  },
  {
    invoiceno: "003",
    status: "Refunded",
    name: "Christopher Jamil",
    post: "Project Manager",
    imgsrc: "/images/profile/user-4.jpg",
    progress: 92,
  },
  {
    invoiceno: "004",
    status: "Paid",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    imgsrc: "/images/profile/user-5.jpg",
    progress: 60,
  },
  {
    invoiceno: "005",
    status: "Cancelled",
    name: "Micheal Doe",
    post: "Content Writer",
    imgsrc: "/images/profile/user-7.jpg",
    progress: 30,
  },
]
