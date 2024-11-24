export type TEBook = 'teach_material' | 'student_material';

export interface DRecordChapter {
    chapter: Array<any>,
    publishToVolume: {
        value: Array<number>
    }
};

/**
 * epub电子课本信息，对应创建页面中的属性。（ 注意: 此属性不会写入epub中，但会保存在数据库的setting中作为下次编辑页面的初始化信息 ）
 */
export interface DRecord {
    id: string,
    is_cd: Boolean,
    version: string,
    type: TEBook,
    ossPath: string,
    chapterTag: DRecordChapter
}

export default interface IRecord {
    toJson(): DRecord;
}