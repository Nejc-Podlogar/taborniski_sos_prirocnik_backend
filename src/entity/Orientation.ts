import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export enum topoCharactersType {
    GEODETSKE_TOCKE = 'geodetske_tocke',
    MORJE_IN_MORSKA_OBALA = 'morje_in_morska_obala',
    NASELJA_IN_OBJEKTI = 'naselja_in_objekti',
    PROMET = 'promet',
    RASTJE_IN_VRSTE_TAL = 'rastje_in_vrste_tal',
    RELIEF = 'relief',
    VODOVJE = 'vodovje',
    MEJE_IN_OGRAJE = 'meje_in_ograje',
}



@Entity()
export class Orientation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imageLoc: string;

    @Column({
        type: "enum",
        enum: topoCharactersType,
    })
    topoGroupType: topoCharactersType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;



}