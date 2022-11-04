<table>
    <tr>
        <td>
            <b>Partner</b>
        </td>
        <td>
            id: #{{$user->id}}<br/>
            Full Name: {{$user->name}} {{$user->surname}}<br/>
            email: {{$user->email}}<br/>
            phone: {{$user->phone}}<br/>
        </td>
    </tr>

    <tr>
        <td>
            <b>Amount</b>
        </td>
        <td>
            {{$user->balance}}GEL<br/>

        </td>
    </tr>
    <tr>
        <td>
            <b>Bank Account</b>
        </td>
        <td>
            Bank id: {{$bank_account->bank_id}}<br/>
            Account: {{$bank_account->account_number}}<br/>
        </td>
    </tr>
</table>
