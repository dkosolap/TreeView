/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIs } from "./constants";
import { treeMockResponse } from "./mocks/treeMock";

const goodResponse = <T>(data: T) => new Response(JSON.stringify({ data }), {
  status: 200,
  statusText: 'OK',
  headers: { 'Content-Type': 'application/json' },
});

const badResponse = (message: string, statusCode: number = 400) => new Response(JSON.stringify({ error: message }), {
  status: statusCode,
  statusText: 'Bad Request',
  headers: { 'Content-Type': 'application/json' },
});

export const mockFetch = async (url: string, config?: RequestInit): Promise<Response> => {
  let response;
  switch(url) {
    case APIs.TREE:
      response =  goodResponse(treeMockResponse);
      break;
    default:
      response =  badResponse('Not Found', 404);
  }
  return Promise.resolve(response);
};
