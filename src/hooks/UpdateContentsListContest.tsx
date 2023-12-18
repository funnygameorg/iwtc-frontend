'use client';
import { createContext } from 'react';

/**
 * 자신의 월드컵 컨텐츠 수정 페이지에서 변경된 컨텐츠 데이터를 관리하기 위해 사용된다.
 * (변경된 데이터는 Server에 수정 요청을 보냄)
 */
export const UpdateContentsListContest = createContext([]);
