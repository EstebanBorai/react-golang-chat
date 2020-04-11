import Author from './author';

export default interface Message {
  author: Author;
  message: string;
  issuedAt: Date;
}
