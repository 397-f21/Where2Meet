import { render, queryByTestId, getByTestId, screen, fireEvent, toBeEmpty } from "@testing-library/react";
import {AddressRenderer, Wrapper} from "../components/AddressRenderer";
import React, {useState, useEffect} from 'react';

describe("Meeting Location Test", () => {
    it("should display a list of addresses if places have been entered", () => {
        const places = [{
            address: "807 Foster St, Evanston, IL 60201, USA",
            lat: 42.0540691,
            lng: -87.68217039999999
        }];
        const { queryByTestId } = render(<AddressRenderer places={places} />);
        const text = queryByTestId("addressList");
        expect(text).toBeTruthy();
    });
    it("should not display addresses if none are given", () => {
        const { queryByTestId } = render(<AddressRenderer places={
            {
            }
        } />);
        const text = queryByTestId("addressList");
        expect(text).toBeFalsy();
    })

    it("should remove the address when the 'X' button is clicked", () => {
        var {queryAllByTestId} = render(<Wrapper/>);

        const button = screen.getByTestId("DeleteButton");
        fireEvent.click(button);

        const afterText = queryAllByTestId("Address");
        expect(afterText).toHaveLength(0);

    });

})
