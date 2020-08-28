import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

function SingleFormGroup({ labelName, setValue, type }: any) {
    return (
        <FormGroup>
            <Label>{labelName}</Label>
            <Input
                type={type}
                onChange={(e: any) => setValue(e.target.value)}
            />
        </FormGroup>
    )
}

export default SingleFormGroup
