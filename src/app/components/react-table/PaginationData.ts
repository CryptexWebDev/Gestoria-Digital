export interface PaginationDataType {
  name: string
  avatar: string
  project: string
  percent: number
  users: { img: string }[]
  status: string
}

export const basicsTableData: PaginationDataType[] = [
  {
    name: "Sunil Joshi",
    avatar: "/images/profile/user-7.jpg",
    project: "Elite Admin",
    percent: 78,
    users: [
      { img: "/images/profile/user-7.jpg" },
      { img: "/images/profile/user-3.jpg" },
    ],
    status: "active",
  },
  {
    name: "Andrew McDownland",
    avatar: "/images/profile/user-3.jpg",
    project: "Real Homes WP Theme",
    percent: 45,
    users: [
      { img: "/images/profile/user-3.jpg" },
      { img: "/images/profile/user-4.jpg" },
    ],
    status: "pending",
  },
  {
    name: "Christopher Jamil",
    avatar: "/images/profile/user-4.jpg",
    project: "MedicalPro WP Theme",
    percent: 92,
    users: [{ img: "/images/profile/user-4.jpg" }],
    status: "completed",
  },
  {
    name: "Nirav Joshi",
    avatar: "/images/profile/user-5.jpg",
    project: "Hosting Press HTML",
    percent: 60,
    users: [
      { img: "/images/profile/user-5.jpg" },
      { img: "/images/profile/user-7.jpg" },
    ],
    status: "cancel",
  },
  {
    name: "Micheal Doe",
    avatar: "/images/profile/user-7.jpg",
    project: "Helping Hands WP Theme",
    percent: 30,
    users: [{ img: "/images/profile/user-7.jpg" }],
    status: "active",
  },
]
