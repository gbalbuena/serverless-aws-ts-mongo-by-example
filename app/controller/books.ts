import { Context } from 'aws-lambda';
import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { BooksService } from '../service/books';
import { CreateBookDTO } from '../model/dto/createBookDTO';
import logger from '../utils/logger';
import { ResponseVO } from '../model/vo/ResponseVo';

export class BooksController extends BooksService {
  constructor (books: Model<any>) {
    super(books);
  }

  /**
   * Create book
   * @param {*} event
   */
  async create (event: any, context?: Context): Promise<ResponseVO> {
    logger.info('functionName', { functionName: context.functionName });
    const params: CreateBookDTO = JSON.parse(event.body);

    try {
      const result = await this.createBook({
        description: params.description,
        name: params.name,
        id: params.id,
      });

      return MessageUtil.created(result);
    } catch (err) {
      logger.error('Something went wrong', err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a book by id
   * @param event
   */
  async update (event: any): Promise<ResponseVO> {
    const id: number = Number(event.pathParameters.id);
    const body: object = JSON.parse(event.body);

    try {
      const result = await this.updateBooks(id, body);
      return MessageUtil.updated(result);
    } catch (err) {
      logger.error('Something went wrong', err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find book list
   */
  async find () {
    try {
      const result = await this.findBooks();

      return MessageUtil.success(result);
    } catch (err) {
      logger.error('Something went wrong', err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query book by id
   * @param event
   */
  async findOne (event: any, context: Context) {
    // The amount of memory allocated for the function
    logger.info('memoryLimitInMB: ', context.memoryLimitInMB);

    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneBookById(id);

      return MessageUtil.success(result);
    } catch (err) {
      logger.error('Something went wrong', err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete book by id
   * @param event
   */
  async deleteOne (event: any) {
    const id: number = event.pathParameters.id;

    try {
      const result = await this.deleteOneBookById(id);

      if (result.deletedCount === 0) {
        return MessageUtil.error(1010, 'The data was not found! May have been deleted!');
      }

      return MessageUtil.success(result);
    } catch (err) {
      logger.error('Something went wrong', err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
