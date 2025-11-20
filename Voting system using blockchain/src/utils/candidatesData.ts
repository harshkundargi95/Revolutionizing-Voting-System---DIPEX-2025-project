
export interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  description: string;
}

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Candidate A",
    party: "Party X",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4HOGWQkGK0PSKC04UCh_szsg7_JXsMS3iOQ&s",
    description: " "
  },
  {
    id: "2",
    name: "Candidate B",
    party: "Party Y",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    description: ""
  },
  {
    id: "3",
    name: "Candidate C",
    party: "Party Z",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    description: ""
  },
  {
    id: "4",
    name: "NOTA",
    party: "None of the Above",
    image: "data:image/png;base64,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",
    description: ""
  }
];
