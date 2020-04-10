import React from 'react';
import { BicycleNetwork, Field, Calculator1OpFactory, SetterConstant, FieldCode } from "bicycle-network";

interface ConvertState {
    feet: string;
    inches: string;
}

class ConverterNetwork {
    network: BicycleNetwork
    fields = {
        feet: new Field<number>(),
        inches: new Field<number>()
    }

    constructor() {
        this.network = new BicycleNetwork()

        let feetField = this.fields.feet
        let inchesField = this.fields.inches
        this.network.adoptField(feetField)
        this.network.adoptField(inchesField)

        Calculator1OpFactory.registerFactory<number, number>(
            inchesField.id, feetField.id, function (i) { return i * 12.0 })
        Calculator1OpFactory.registerFactory<number, number>(
            feetField.id, inchesField.id, function (i) { return i / 12.0 })

        this.network.connectCalculators()
    }

    getStateFromField(name: keyof ConvertState, field: Field<number>): Pick<ConvertState, keyof ConvertState> {
        let str = (field.code === FieldCode.clear) ? "" : field.value().toString()
        return {
            [name]: str
        } as Pick<ConvertState, keyof ConvertState>
    }

    handleChange(e: React.FormEvent<HTMLInputElement>): Pick<ConvertState, keyof ConvertState>[] {
        const { name, value } = e.currentTarget;
        let num = parseFloat(value)
        let field = this.fields[name as keyof ConvertState]

        if (value === "") {
            this.network.dropSetters(field)
        } else if (isNaN(num)) {
            return [{
                [name]: value
            } as Pick<ConvertState, keyof ConvertState>]
        } else {
            this.network.adoptSetter(new SetterConstant<number>(field, num))
        }

        return [
            this.getStateFromField("feet", this.fields.feet),
            this.getStateFromField("inches", this.fields.inches)
        ]
    }
}

export class ConvertForm extends React.Component<{}, ConvertState> {
    public state = {
        feet: "",
        inches: "",
    };

    converter: ConverterNetwork

    constructor(props: Readonly<() => any>, context?: any) {
        super(props, context)
        this.converter = new ConverterNetwork()
    }

    public render() {
        const { feet, inches } = this.state;
        return (
            <form>
            Feet: <input name="feet" value={feet} onChange={this.handleChange} /><br />
            Inches: <input name="inches" value={inches} onChange={this.handleChange} />
            </form>
        );
    }

    private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        for (let s of this.converter.handleChange(e)) {
            this.setState(s)
        }
    }
}
